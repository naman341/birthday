import cv2
import numpy as np
from PIL import Image
import os

def convert_to_sketch(image_path):
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"The file {image_path} does not exist.")
    
    # Read the image
    image = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if image is None:
        raise ValueError(f"Failed to read the image file {image_path}. Please check the file path and integrity.")
    
    # Handle transparency if present
    if len(image.shape) == 3 and image.shape[2] == 4:
        # Convert to BGR
        bgr_image = cv2.cvtColor(image, cv2.COLOR_BGRA2BGR)
        gray_image = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2GRAY)
    else:
        gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Invert the grayscale image
    inverted_image = 255 - gray_image
    
    # Blur the inverted image
    blurred = cv2.GaussianBlur(inverted_image, (21, 21), 0)
    
    # Invert the blurred image
    inverted_blurred = 255 - blurred
    
    # Create the pencil sketch image
    sketch = cv2.divide(gray_image, inverted_blurred, scale=256.0)
    
    return sketch

def create_animation(sketch, output_path):
    frames = []
    sketch_height, sketch_width = sketch.shape
    
    for i in range(0, sketch_height, 10):
        frame = np.zeros_like(sketch)
        frame[:i, :] = sketch[:i, :]
        
        # Convert the frame to an image
        pil_frame = Image.fromarray(frame)
        frames.append(pil_frame)
    
    # Save the frames as a GIF
    if frames:
        frames[0].save(output_path, save_all=True, append_images=frames[1:], duration=100, loop=1)
    else:
        print("No frames to save.")

def main():
    # Replace 'your_image.png' with the path to your PNG image
    image_path = 'your_image1.jpg'
    
    try:
        sketch = convert_to_sketch(image_path)
        # Save the sketch image to verify
        cv2.imwrite('sketch.jpg', sketch)
        print("Sketch image saved successfully.")
        
        # Create the animation
        output_path = 'sketch_animation.gif'
        create_animation(sketch, output_path)
        print("Sketch animation created successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
