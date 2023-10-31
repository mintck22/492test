import boto3
from datetime import datetime, timedelta

# Replace these with your actual AWS credentials and region
aws_access_key = 'your_access_key'
aws_secret_key = 'your_secret_key'
aws_region = 'your_region'

# Initialize Boto3 session with credentials and region
session = boto3.Session(
    aws_access_key_id=aws_access_key,
    aws_secret_access_key=aws_secret_key,
    region_name=aws_region
)

# Initialize Boto3 Rekognition client using the session
rekognition_client = session.client('rekognition')

# Specify your S3 bucket name
bucket_name = 'your_bucket_name'

# Initialize S3 client using the session
s3 = session.client('s3')

# Labels to detect and count
labels_to_count = ['Female', 'Male', 'Man', 'Woman', 'Person', 'Adult', 'Child']

# Define the DynamoDB table name
dynamodb_table_name = 'your_table_name'

# Define the Thailand timezone offset from UTC (7 hours ahead)
thailand_timezone_offset = timedelta(hours=7)

def store_info_in_dynamodb(image_name, human_count, upload_time):
    dynamodb_client = session.client('dynamodb')

    # Convert the upload time to Thailand timezone
    upload_time_thailand = upload_time + thailand_timezone_offset

    # Define the DynamoDB item
    dynamodb_item = {
        'ImageName': {'S': image_name},
        'HumanCount': {'N': str(human_count)},  # Store human count as a numeric attribute
        'UploadTime': {'S': upload_time_thailand.strftime('%Y-%m-%dT%H:%M:%S')}  # Store upload time as a string in Thailand timezone
    }

    # Put the item in DynamoDB
    response = dynamodb_client.put_item(
        TableName=dynamodb_table_name,
        Item=dynamodb_item
    )

def lambda_handler(event, context):
    # List objects (images) in the S3 bucket
    response = s3.list_objects(Bucket=bucket_name)

    # Check if the 'Contents' key exists in the response and if it contains any objects
    if 'Contents' in response:
        objects = response['Contents']

        # Get a list of image names that have already been processed from DynamoDB
        dynamodb_client = session.client('dynamodb')
        processed_images = set()
        response = dynamodb_client.scan(TableName=dynamodb_table_name)
        for item in response.get('Items', []):
            processed_images.add(item['ImageName']['S'])

        # Iterate through each object (image) in the bucket
        for obj in objects:
            image_name = obj['Key']

            # Check if the image has already been processed
            if image_name not in processed_images:
                # Get the current UTC timestamp
                upload_time = datetime.utcnow()

                # Perform label detection on the image using Rekognition
                response = rekognition_client.detect_labels(
                    Image={
                        'S3Object': {
                            'Bucket': bucket_name,
                            'Name': image_name
                        }
                    },
                    MaxLabels=10,  # Adjust as needed
                    MinConfidence=90  # Adjust confidence threshold as needed
                )

                # Initialize counts for labels and human
                label_counts = {label: 0 for label in labels_to_count}
                human_count = 0

                # Count the labels and calculate the human count
                for label_info in response['Labels']:
                    label_name = label_info['Name']
                    if label_name in labels_to_count:
                        instance_count = len(label_info.get('Instances', []))
                        label_counts[label_name] += instance_count

                # Sum the counts of specific labels to calculate human count
                for label in labels_to_count:
                    human_count += label_counts[label]

                # Store human count in DynamoDB
                store_info_in_dynamodb(image_name, human_count, upload_time)

        return {
            'statusCode': 200,
            'body': 'Processing completed.'
        }
    else:
        return {
            'statusCode': 200,
            'body': 'No objects found in the S3 bucket.'
        }