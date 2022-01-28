from google.cloud import vision
from google.cloud import storage

def hello_gcs(event, context):
    """Triggered by a change to a Cloud Storage bucket.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
    file = event
    print(f"Processing file: {file['name']}.")
    #file_name = file['name']
    path = event["id"].rsplit("/",1)[0]


    image_uri = "gs://" + str(path)

    print("image URI is: " + str(image_uri))

    client = vision.ImageAnnotatorClient()

    # The name of the image file to annotate
    # file_name = os.path.abspath(r'C:\Users\EK\Downloads\cat-gbe9c7c791_1280.jpg')
    #file_name = os.path.abspath(r'C:\Users\EK\Downloads\dog.jpg')
    # Loads the image into memory

    image = vision.Image()
    image.source.image_uri = image_uri

    # Performs label detection on the image file
    response = client.label_detection(image=image)
    labels = response.label_annotations

    list_scores = []
    print('Labels:')
    for label in labels:
        list_scores.append((label.description, label.score))
        print(label.description + "\t" + str(label.score))

    print(list_scores)

    max_score = 0
    max_prob_object = ''
    for item in list_scores:
        temp_object = item[0]
        temp_score = item[1]
        if (temp_score > max_score):
            max_score = temp_score
            max_prob_object = temp_object


    print("The object is " + max_prob_object)

    storage_client = storage.Client()
    bucket = storage_client.get_bucket( 'output_image_serverless_proj' )
    filename = 'image_output.txt'
    blob = bucket.blob(filename)
    if  blob.exists():
        old_content = blob.download_as_text()
        old_objects = old_content.split(",")
        if max_prob_object in old_objects:
            print("The image uploaded matches the old image")
        old_content = ','.join(set(old_objects))
        new_content = old_content + "," + max_prob_object
        blob.upload_from_string(new_content)
    else:
        blob = bucket.blob(filename)
        blob.upload_from_string(max_prob_object)