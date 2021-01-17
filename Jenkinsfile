pipeline {
    agent any

    stages {
        stage('Check out code') {
            steps {
                 checkout scm
            }
        }
        stage('Build Docker image') {
            steps {
                 sh 'docker login -u $DOCKER_ID -p $Password'
                 sh 'docker build -t $DOCKER_ID/jx_testnodejs .'
            }
        }
        
        stage('Push container') {
            steps {
                sh "docker push $DOCKER_ID/jx_testnodejs" 
            }
        }
    //    stage('Remove old container') {
    //        steps {
      //          sh 'docker rm -f ng-dev'
	 //       sh 'docker rm -f ng-qa'
	//	sh 'docker rm -f ng'
  //          }
  //      }
        stage('Deploy to dev') {
            steps {
               sh 'docker run --name ng-dev -d -p 8021:9090 $DOCKER_ID/jx_testnodejs'
            }
        }
        stage('Deploy to qa') {
            steps {
               sh 'docker run --name ng-qa -d -p 8022:9090 $DOCKER_ID/jx_testnodejs'
            }
        }
        stage('Approve to prod') {
            steps {
              timeout(time:1, unit:'DAYS') {
		         input('Do you want to deploy to live?')
	     }
            }
        }
        stage('Deploy container to production') {
            steps {
                sh 'docker run --name ng -d -p 8020:9090 $DOCKER_ID/jx_testnodejs'
                sh 'docker ps'
            }
        }
    }
}
