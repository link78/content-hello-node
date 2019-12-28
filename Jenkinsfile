pipeline {
  
  environment {
   dockerImage = "" 
    DOCKER_IMAGE_NAME= "burk1212/kubenodejs"
  }
  
  
  agent any
  
  stages{
    
    stage ('Install docker'){
    	steps {
       	container('nodejs'){
	      sh 'node --version'
             sh 'apk update && apk add docker'
             sh 'docker --version'
	}
	}
}
     
   stage('Push Image to Docker Hub'){
       // when { branch 'master'}
      steps {
       
        container('nodejs') {
        docker.withRegistry('https://registry.hub.docker.com','DOCKER_ID') {
          dockerImage = docker.build(DOCKER_IMAGE_NAME)
          dockerImage.push("${env.BUILD_NUMBER}")
          dockerImage.push("latest")
        }
        }
      }
     }  
      
     
    
  } //end of stages
}
















