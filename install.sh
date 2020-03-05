pip3 install Django;
pip3 install djangorestframework;
pip3 install django-cors-headers;
pip3 install django-health-check;
if [ ! -d ~/.nvm ]; then
  sudo xcodebuild -license
  curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | bash
  source ~/.nvm/nvm.sh
  source ~/.profile
  source ~/.bashrc
  export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 
  nvm install node
  nvm use node
fi
cd methdealer;
npm i;
cd ..;