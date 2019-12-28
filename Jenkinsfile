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
     
      stage('Buildgin Nodejs App Image Container'){
       // when { branch 'master'}
        steps{
         container('nodejs'){
        dockerImage = docker.build(DOCKER_IMAGE_NAME)
         dockerImage.inside {
          sh 'echo $(curl localhost:9090)'
         }
         
        } // end of script
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
   // stage('Remove old Container'){
    //  steps {
    //  sh label:'',script: 'docker rm -f nodejs-cicd'
    //  }
  //  }
    stage('Running Nodejs container') {
    steps {
      container('nodejs'){
      sh label: '',script: 'docker run --name nodejs-cicd -d -p 9090:9090 burk1212/kubenodejs'
    }
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
















