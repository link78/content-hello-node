podTemplate(name: 'devops',label: 'devops', containers: [
  containerTemplate(name: 'docker', image: 'trion/jenkins-docker-client',ttyEnabled: true, command: 'cat'),
  containerTemplate(name: 'nodejs', image: 'node:alpine', ttyEnabled: true, command: 'cat')
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')],
 {
 node ('devops') {
   environment {
   
   DOCKER_IMAGE_NAME = "burk1212/kube-nodejs"
   }
   
    stage('checkout') {
      container('nodejs') {
        scm
      }
    }
    stage ('Build App') {
      container('nodejs') {
      sh 'npm install'
      }
    }
    stage('Build Docker Image') {
      container('docker') {
        sh 'docker --version'
	sh 'docker build -t $DOCKER_HUB_USR/kube-nodejs .'
	sh 'docker login -u $DOCKER_HUB_USR -p $DOCKER_HUB_PASSWD'
	sh 'docker push $DOCKER_HUB_USR/kube-nodejs'
        
      }
    }
 }

})
