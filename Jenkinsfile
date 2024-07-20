pipeline {
    agent any

    environment {
        BUILD_CLIENT = 'true' // Set to 'false' to skip client build
        BUILD_API = 'true'    // Set to 'false' to skip API build
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/tanktoppandey/ecommTemplate.git', branch: 'main'
            }
        }

        stage('Build Client Docker Image') {
            when {
                expression {
                    return env.BUILD_CLIENT == 'true'
                }
            }
            steps {
                script {
                    docker.build("client", "-f client/Dockerfile ./client")
                }
            }
        }

        stage('Build API Docker Image') {
            when {
                expression {
                    return env.BUILD_API == 'true'
                }
            }
            steps {
                script {
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
