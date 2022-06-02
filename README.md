# martian-robots
## Prerequisites
An installation of Node.js 16
## Installation
From the root of the repository:
```sh
npm install -g .
```
## Usage
Note: this program assumes you are providing input in a plaintext file encoded in UTF8 or ASCII
```sh
robots -p "path/to/input.txt"
```
Tip: wrapping the path to the input allows use of Windows' backslash-separated paths and spaces in file names.

Typing long file paths can be avoided by placing the input file in the root of the repository, and then specifying just the file name.

## Troubleshooting
Should you encounter a Windows Script Host error when trying to invoke the program using Command Prompt on Windows, please try running this alternative command from the root of the repository:
```sh
node . -p "path/to/input.txt"
```
