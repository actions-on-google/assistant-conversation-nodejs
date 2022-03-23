#!/bin/sh
#
# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

if [ "$NODE_ENV" != "ci" ]; then
  echo "Error: Script can only be ran in an continuous integration environment"
  exit 1
fi

# Fail on any error.
set -e
set -x

# Install n
sudo npm install -g n@latest
sudo n lts
node --version
npm --version
npm i
npm run ci

# Setup Git Presubmit Linter
GIT_PRESUBMIT_LINTER='./git-presubmit-linter'
RULES="${GIT_PRESUBMIT_LINTER}/rules"

if [ ! -d ${GIT_PRESUBMIT_LINTER} ]; then
    # Clone the git presubmit linter repository
    git clone https://github.com/google/git-presubmit-linter.git
fi
cd ${GIT_PRESUBMIT_LINTER}
git pull origin master
cd ../

set +e
# Check that CHANGELOG.md was updated (unless explicitly turned off)
git log -1 | grep "DISABLE_CHANGELOG_CHECK"
set -e
DISABLE_CHANGELOG_CHECK=$?
if [ $DISABLE_CHANGELOG_CHECK -ne 0 ]; then
    git diff HEAD~1 --name-only | ${RULES}/has-pattern.sh "CHANGELOG.md"
fi
# Check that no change introduces trailing whitespace
git diff HEAD~1 --pretty=%B | ${RULES}/trailing-whitespace.sh
