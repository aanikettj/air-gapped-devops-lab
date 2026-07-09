pipeline {
  agent any
  environment {
    REGISTRY = 'ghcr.io/REPLACE_OWNER' // change to your registry
    REPO = 'air-gapped-devops-lab'    // change to your repo name
    IMAGE_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT ?: 'local'}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build & Push Backend') {
      steps {
        dir('backend') {
          sh 'docker build -t $REGISTRY/$REPO-backend:$IMAGE_TAG .' 
          withCredentials([usernamePassword(credentialsId: 'registry-cred', usernameVariable: 'REG_USER', passwordVariable: 'REG_PASS')]) {
            sh 'echo $REG_PASS | docker login ghcr.io -u $REG_USER --password-stdin'
            sh 'docker push $REGISTRY/$REPO-backend:$IMAGE_TAG'
          }
        }
      }
    }

    stage('Build & Push Frontend') {
      steps {
        dir('frontend') {
          sh 'docker build -t $REGISTRY/$REPO-frontend:$IMAGE_TAG .' 
          withCredentials([usernamePassword(credentialsId: 'registry-cred', usernameVariable: 'REG_USER', passwordVariable: 'REG_PASS')]) {
            sh 'echo $REG_PASS | docker login ghcr.io -u $REG_USER --password-stdin'
            sh 'docker push $REGISTRY/$REPO-frontend:$IMAGE_TAG'
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      when {
        expression { return env.DEPLOY == 'true' }
      }
      steps {
        withCredentials([file(credentialsId: 'kubeconfig-file', variable: 'KUBECONFIG_FILE')]) {
          sh 'export KUBECONFIG=$KUBECONFIG_FILE'
          sh 'kubectl set image deployment/backend backend=$REGISTRY/$REPO-backend:$IMAGE_TAG --record || true'
          sh 'kubectl set image deployment/frontend frontend=$REGISTRY/$REPO-frontend:$IMAGE_TAG --record || true'
          sh 'kubectl apply -f k8s/'
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}
