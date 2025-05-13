import os
import requests

# Function to download image
def download_image(url, folder, image_name):
    try:
        # Get the content of the image
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful

        # Ensure the folder exists
        if not os.path.exists(folder):
            os.makedirs(folder)

        # Define the file path and save the image
        file_path = os.path.join(folder, image_name)
        with open(file_path, 'wb') as file:
            file.write(response.content)
        print(f"Image saved as {image_name}")
    
    except requests.exceptions.RequestException as e:
        print(f"Error downloading {image_name}: {e}")

# List of image URLs (replace with your actual PVC panel image URLs)
image_urls = [
    "https://example.com/pvc_image1.jpg",  # Replace with real URLs
    "https://example.com/pvc_image2.jpg",
    "https://example.com/pvc_image3.jpg",
    # Add more URLs as needed
]

# Folder where images will be saved
folder = "downloaded_pvc_panels"

# Set the starting point for the naming pattern
starting_index = 6

# Loop through the image URLs
for i, url in enumerate(image_urls, start=starting_index):
    # Create a custom name for each image (e.g., kumarpvci6.jpeg, kumarpvci7.jpeg, etc.)
    image_name = f"kumarpvci{i}.jpeg"
    
    # Download the image with the custom name
    download_image(url, folder, image_name)
