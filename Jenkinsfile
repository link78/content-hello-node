pipeline {
  
  environment {
   dockerImage = "" 
  }
  
  
  agent any
  
  stages{
     
      stage('Buildgin Nodejs App Image Container'){
       // when { branch 'master'}
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
       // when { branch 'master'}
      steps {
       
        script {
        docker.withRegistry('https://registry.hub.docker.com','Burk1212') {
          dockerImage = docker.build("burk1212/hello-nodejs:${env.BUILD_NUMBER}")

          dockerImage.push("latest")
        }
        }
      }
     }
    stage('Remove old Container'){
      steps {
      sh label:'',script: 'docker rm -f nodejs-cicd'
      }
    }
    stage('Running Nodejs container') {
    steps {
      sh label: '',script: 'docker run --name nodejs-cicd -d -p 9090:9090 burk1212/hello-nodejs'
    }
    }
    
  } //end of stages
}
