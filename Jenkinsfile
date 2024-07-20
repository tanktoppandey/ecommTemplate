pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                 git url: 'https://github.com/tanktoppandey/ecommTemplate.git', branch: 'main'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("client", "-f client/Dockerfile ./client")
                    docker.build("api", "-f api/Dockerfile ./api")
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }
}
