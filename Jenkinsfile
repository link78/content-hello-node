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
        script {
          sh 'docker -version'
        docker.withRegistry('https://registry.hub.docker.com','DOCKER_ID') {
        def dockerImage = docker.build(DOCKER_IMAGE_NAME)
        dockerImage.push("${env.BUILD_NUMBER}")
        dockerImage.push("latest")
	}
        
      }
    }
 }

})
