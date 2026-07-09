Kubernetes manifests

- Edit the `image` fields in `backend-deployment.yaml` and `frontend-deployment.yaml` to point to your registry (e.g. `ghcr.io/<owner>/<repo>-backend:latest`).
- Create a secret for DB password if needed:
  kubectl create secret generic db-credentials --from-literal=DB_PASSWORD=<your-db-password>
- To apply manifests locally:
  kubectl apply -f k8s/
