pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
        jdk 'jdk21'
        maven 'Maven'
    }

    environment {
        REGISTRY = '192.168.72.133'
        PROJECT = 'devops'
        TAG = "${BUILD_NUMBER}"
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
                    bat 'npm ci'
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
                    bat 'npm ci'
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
                    echo %HARBOR_PASS% | docker login %REGISTRY% -u %HARBOR_USER% --password-stdin
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
                    docker build -t %REGISTRY%/%PROJECT%/frontend:%TAG% .
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
                sshagent(credentials: ['master-ssh']) {
                    bat '''
                    ssh -o StrictHostKeyChecking=no root@192.168.72.131 "kubectl apply -f /home/master/air-gapped-devops-lab/k8s/"
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                sshagent(credentials: ['master-ssh']) {
                    bat '''
                    ssh -o StrictHostKeyChecking=no root@192.168.72.131 "kubectl get pods && kubectl get svc && kubectl get deployment"
                    '''
                }
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
