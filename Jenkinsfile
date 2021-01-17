pipeline{
    agent {
        docker { image 'node:9-alpine'}
    }
    stages {
        stage('Test node') {
            steps {
                sh 'node --version'
            }
        }
	stage('Build project') {
            steps {
                sh 'npm install'
            }
        }
	stage('run project') {
            steps {
                sh 'npm start'
            }
        }
    }
}



























