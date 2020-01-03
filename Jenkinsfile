podTemplate(name: 'devops',label: 'devops', containers: [
  containerTemplate(name: 'docker', image: 'joao29a/jnlp-slave-alpine-docker',ttyEnabled: true, command: 'cat'),
  containerTemplate(name: 'nodejs', image: 'node:alpine', ttyEnabled: true, command: 'cat')
],
volumes: [
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')],
 {
 node ('devops') {
   environment {
   
   DOCKER_IMAGE_NAME = "burk1212/kube-nodejs"
   }
   
    stage('checkout and Installing docker') {
	 git 'https://github.com/link78/hello-nodejs.git'
      container('nodejs') {
	 sh 'node --version'
         sh 'apk update && apk add docker'
         sh 'docker --version'
        
      }
    }
    stage ('Build App') {
      container('nodejs') {
      sh 'npm install'
      }
    }
	 
	 
	 
    stage('Build Docker Image') {
      container('nodejs') {
        sh 'docker --version'
	sh 'docker build -t $DOCKER_HUB_USR/kube-nodejs .'
	sh 'docker login -u $DOCKER_HUB_USR -p $DOCKER_HUB_PASSWD'
	sh 'docker push $DOCKER_HUB_USR/kube-nodejs'
	sh 'docker run --name test-d -p 9091:9090 $DOCKER_HUB_USR/kube-nodejs'
	sh 'docker ps' 
        
      }
    }
  stage('Deploy to Kube'){
    steps {   
     kubernetesDeploy(
         kubeconfigId: 'kubeConfig_id',
         configs: 'kube-nodejs.yml',
         enableConfigSubstitution: true
        
       )
        
        
      }
   }
	 
 }

})












