Kubernetes manifests

- Edit the `image` fields in `backend-deployment.yaml` and `frontend-deployment.yaml` to point to your Harbor registry.
  Example values:
  - backend: `harbor.example.com/your-harbor-project/ecommerce-backend:latest`
  - frontend: `harbor.example.com/your-harbor-project/ecommerce-frontend:latest`
- Create a secret for DB password if needed:
  kubectl create secret generic db-credentials --from-literal=DB_PASSWORD=<your-db-password>
- Apply the manifests:
  kubectl apply -f k8s/
- If you change images later, update them with:
  kubectl set image deployment/backend backend=<your-backend-image> --record
  kubectl set image deployment/frontend frontend=<your-frontend-image> --record
