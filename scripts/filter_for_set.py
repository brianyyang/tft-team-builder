import json

def read_json(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            print(json.dumps(data, indent=4))
    except FileNotFoundError:
        print(f"Error: The file at {file_path} was not found.")
    except json.JSONDecodeError:
        print(f"Error: The file at {file_path} is not a valid JSON file.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage:
file_path = 'path/to/your/jsonfile.json'
read_json(file_path)
