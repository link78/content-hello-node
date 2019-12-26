pipeline {
  
  environment {
   dockerImage = "" 
  }
  
  
  agent any
  
  stages{
     
      stage('Buildgin Nodejs App Image Container'){
        when { branch 'master'}
        steps{
         script{
        dockerImage = docker.build("burk1212/hello-nodejs:${env.BUILD_NUMBER}")
         dockerImage.inside {
          sh 'echo $(curl localhost:9090)'
         }
         
        } // end of script
        }
      }
      
     stage('Push Image to Docker Hub'){
        when { branch 'master'}
      steps {
       
        script {
        docker.withRegistry('https://registry.hub.docker.com','Burk1212') {
        dockerImage = docker.push("${env.BUILD_NUMBER}")
          dockerImage.push("latest")
        }
        }
      }
     }
    stage('Deploying') {
    steps {
      sh label: '',script: 'echo "deploying app"'
    }
    }
    
  } //end of stages
}
