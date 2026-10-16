import os
import urllib.request
from PIL import Image

assets = {
    "public/images/blog/blog-1.webp": "https://framerusercontent.com/images/sXODYJipG0HDttp7ccwnlg0kbc.jpg",
    "public/images/blog/blog-2.webp": "https://framerusercontent.com/images/YML5aO5MOrIGKqjyKDHYMj9Sg.jpg",
    "public/images/cta-bg.webp": "https://framerusercontent.com/images/kmAAas8MaAh4Wih3eer7Gzx46UE.jpg",
    "public/images/footer-card.webp": "https://framerusercontent.com/images/Wvf4qSw3uHKa7L8cBaeQ779lbOQ.jpg"
}

for dest, url in assets.items():
    dest_path = os.path.join(r"D:\cns3", dest.replace("/", "\\"))
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    temp_file = dest_path + ".temp"
    print(f"Downloading {url} to {temp_file}...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp, open(temp_file, 'wb') as f:
        f.write(resp.read())
    
    # Convert to webp
    with Image.open(temp_file) as im:
        im.save(dest_path, "WEBP", quality=90)
    os.remove(temp_file)
    print(f"Saved {dest_path}")

print("All assets downloaded and converted successfully!")
