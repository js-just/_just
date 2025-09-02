# MIT License
# 
# Copyright (c) 2025 JustStudio. <https://juststudio.is-a.dev/>
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

#!/usr/bin/env python3
import requests
import os

response = requests.get('https://raw.just.is-a.dev/v1/data/commit.json', headers={'Accept': 'application/json'})
data = response.json()

COMMIT_SHA = os.environ.get('COMMIT_SHA')
GITHUB_ACTOR_ID = int(os.environ.get('GITHUB_ACTOR_ID'))
GITHUB_REPOSITORY_ID = int(os.environ.get('GITHUB_REPOSITORY_ID'))
GITHUB_REPOSITORY_OWNER_ID = int(os.environ.get('GITHUB_REPOSITORY_OWNER_ID'))

output = "N"

def step234():
    global output
    
    # Step 2
    if GITHUB_REPOSITORY_OWNER_ID in data['value']['allowUsersOwner']:
        output = "Y"
    
    # Step 3
    if GITHUB_ACTOR_ID in data['value']['allowUsersActor']:
        output = "Y"
    
    # Step 4
    if GITHUB_REPOSITORY_ID in data['value']['allowRepos']:
        output = "Y"

# Step 1
if data['value']['allowEveryone']:
    if COMMIT_SHA not in data['value']['disallowCommits']:
        output = "Y"
    else:
        step234()
else:
    step234()
    
    # Step 5
    if COMMIT_SHA in data['value']['allowCommits']:
        output = "Y"

print(output)
