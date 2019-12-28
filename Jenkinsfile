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
	script {
        docker.withRegistry('https://registry.hub.docker.com','DOCKER_ID') {
         def dockerImage = docker.build(DOCKER_IMAGE_NAME)
          dockerImage.push("${env.BUILD_NUMBER}")
          dockerImage.push("latest")
	}
        }
        }
      }
     }  
      
	  stage('Run Image on docker') {
            steps {
	    sh label:'',script: 'docker run --name k8s -d -p 9000:9090 burk1212/kubenodejs'
	    }
	  }
	  
	  stage('Deploy on eks cluster') {
		  steps {
		  kube
		  }
	  }
	  
	  stage('Deploy to Kube'){
      steps {
       
        kubernetesDeploy(
          kubeconfigId: 'kube_id',
          configs: 'kube-nodejs.yml',
          enableConfigSubstitution: true
        
        )
        
        
      }
    }
    
  } //end of stages
}
















