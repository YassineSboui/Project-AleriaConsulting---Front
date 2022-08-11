pipeline {
    agent any
    stages {
      stage('creating network'){
            steps { 
                sh 'docker network create web-app-front-network || true'
                }
            }
        stage('Stopping server') {
            steps {
                sh 'docker stop pan_webapp_front || true'
            }
        }
        stage('Building up') {
            steps {
                sh 'docker build -t pan_webapp_front .'
            }
        }
        stage('Starting up') {
            steps {
                sh "docker run --name pan_webapp_front --rm --detach --env REACT_APP_MILIEU=PROD --network pan-network  -p 4000:3000 pan_webapp_front"
            }
        }

        stage('Connecting to pan-file_service-network') {
            steps {
                sh 'docker network connect pan-file_service-network pan_webapp_front'
            }
        }
        
      
    }
}
