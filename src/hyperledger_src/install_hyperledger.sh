cd ~/

wget https://storage.googleapis.com/golang/go1.7.1.linux-amd64.tar.gz

tar xvzf go1*.tar.gz

mkdir $HOME/gopath
export GOPATH=$HOME/gopath
export GOROOT=$HOME/go
export PATH=$PATH:$GOROOT/bin

sudo apt install libltdl-dev

wget https://download.docker.com/linux/ubuntu/dists/xenial/pool/stable/amd64/docker-ce_18.03.1~ce-0~ubuntu_amd64.deb 
sudo dpkg -i docker*.deb
sudo apt install -f

sudo usermod -aG docker #USERNAME
sudo apt install python-pip

sudo pip install docker-compose

sudo apt install git curl

mkdir -p $GOPATH/src/github.com/hyperledger/

cd $GOPATH/src/github.com/hyperledger/

git clone https://github.com/hyperledger/fabric.git

git reset --hard c257bb31867b14029c3a6afe1db35b131757d2bf

git checkout fa3d88cde177750804c7175ae000e0923199735c
sh examples/e2e_cli/download-dockerimages.sh

./generateArtifacts.sh TESTCHANNEL

./network_setup.sh up TESTCHANNEL 10000 couchdb



