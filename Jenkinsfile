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
             sh 'apk update && apt add docker'
             sh 'docker --version'
	}
	}
}
     
     
      
     
    
  } //end of stages
}
















