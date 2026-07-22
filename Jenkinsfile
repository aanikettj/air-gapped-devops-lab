pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
        jdk 'jdk21'
        maven 'Maven'
    }

    environment {
        REGISTRY = '192.168.72.131'
        PROJECT = 'devops'
        TAG = 'latest'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/aanikettj/air-gapped-devops-lab.git'
            }
        }

        stage('Verify Repository') {
            steps {
                bat 'dir'
                bat 'dir frontend'
                bat 'dir backend'
            }
        }

        stage('Frontend Install') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    bat 'set CI=false && npm run build'
                }
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Backend Test') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Docker Login Harbor') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'harbor-creds',
                        usernameVariable: 'HARBOR_USER',
                        passwordVariable: 'HARBOR_PASS'
                    )
                ]) {
                    bat '''
                    docker logout %REGISTRY%
                    (echo|set /p="%HARBOR_PASS%") | docker login %REGISTRY% -u %HARBOR_USER% --password-stdin
                    '''
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    bat '''
                    docker build -t %REGISTRY%/%PROJECT%/backend:%TAG% .
                    '''
                }
            }
        }

        stage('Build Frontend Image') {
    steps {
        dir('frontend') {
            bat '''
            docker build --build-arg REACT_APP_API_URL=http://192.168.72.133:31099 -t %REGISTRY%/%PROJECT%/frontend:%TAG% .
            '''
        }
    }
}

        stage('Push Backend Image') {
            steps {
                bat '''
                docker push %REGISTRY%/%PROJECT%/backend:%TAG%
                '''
            }
        }

        stage('Push Frontend Image') {
            steps {
                bat '''
                docker push %REGISTRY%/%PROJECT%/frontend:%TAG%
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                ssh -o StrictHostKeyChecking=no root@192.168.72.133 "kubectl apply -f /home/master/air-gapped-devops-lab/k8s/"
                ssh -o StrictHostKeyChecking=no root@192.168.72.133 "kubectl rollout status deployment backend --timeout=120s"
                ssh -o StrictHostKeyChecking=no root@192.168.72.133 "kubectl rollout status deployment frontend --timeout=120s"
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                bat '''
                ssh -o StrictHostKeyChecking=no root@192.168.72.133 "kubectl get pods"
                ssh -o StrictHostKeyChecking=no root@192.168.72.133 "kubectl get svc"
                ssh -o StrictHostKeyChecking=no root@192.168.72.133 "kubectl get deployment"
                '''
            }
        }
    }

    post {
        success {
            emailext(
                subject: "SUCCESS : ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Build Successful

Job : ${env.JOB_NAME}

Build Number : ${env.BUILD_NUMBER}

Build URL : ${env.BUILD_URL}
""",
                to: 'niketjadhav7007@gmail.com'
            )
        }

        failure {
            emailext(
                subject: "FAILED : ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Build Failed

Job : ${env.JOB_NAME}

Build Number : ${env.BUILD_NUMBER}

Build URL : ${env.BUILD_URL}
""",
                to: 'niketjadhav7007@gmail.com'
            )
        }
    }
}
