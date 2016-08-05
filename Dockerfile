FROM tomcat:7-jre7

RUN apt-get update

RUN apt-get -y install make python default-jdk unzip curl

RUN apt-get -y install git
    
RUN git clone https://github.com/tvalero/webportal-installer.git /home/webportal-installer

WORKDIR /home/webportal-installer

VOLUME  /usr/local/tomcat/conf

#RUN make clean && make 
