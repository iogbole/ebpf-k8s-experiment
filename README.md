
# Kubernetes Application Overview
This application comprises three main components:

1. **OpenMCT App**: A web-based mission control framework for visualization of data on desktop and mobile devices, primarily used by NASA. This service is exposed over an ingress. See `k8s-manifests/openmct-gke-ingres.yml`
2. **Sender App**: A Node.js application that sends HTTP requests to a receiver, over a K8s service and prints a reponse.
3. **Receiver App**: A Node.js application that responds to the Sender app with a simple "Hello" message.

The communication between the Sender and Receiver apps is managed through Kubernetes services, demonstrating basic inter-service communication in a microservices architecture.

## Deployment Instructions

### Prerequisites
- `kubectl` should be installed and configured to interact with your Kubernetes cluster.

### Step 1: Create Namespace
Create a dedicated namespace for the application components:

```bash
kubectl create ns ebpf
```

### Step 2: Set Namespace Context (Optional)
Optionally, set the `ebpf` namespace as the default for the current context:

```bash
kubectl config set-context --current --namespace=ebpf
```

### Step 3: Deploy Resources
Change directory to the k8s-manifests folder and apply all Kubernetes configurations in the current directory:

```bash

kubectl apply -f .

```

This command creates the necessary ConfigMap, Deployments, and Services: 
- ConfigMap (`app-config`)
- Ingress (`openmct-ingress`)
- ServiceAccount (`israelo`)
- Deployments (`openmct`, `receiver`, `sender`)
- Services (`openmct`, `receiver-service`, `sender-service`)

### Step 4: Verify Deployments
Check the status of the pods to ensure they're running successfully:

```bash
kubectl get pods
```

You should see output similar to:

```
NAME                        READY   STATUS              RESTARTS   AGE
openmct-f68f5445f-6f2hr     0/1     ContainerCreating   0          4m
receiver-6fbffb4b6d-7h4s2   1/1     Running             0          4m
receiver-6fbffb4b6d-jwqzm   1/1     Running             0          4m
sender-8b884c59-hfl6b       1/1     Running             0          3m59s
```

### Step 5: Access and Interact with the Applications

- **OpenMCT App**: Accessible via the NodePort or LoadBalancer IP, depending on your service configuration.
- **Sender and Receiver Apps**: Verify their interaction by checking the logs:

**For the Sender app:**
    ```bash
    kubectl logs <sender-pod-name>
    ```

 You should see output similar to:
   ``` 
$ k logs sender-8b884c59-hfl6b 
Error connecting to Receiver: connect ECONNREFUSED 10.88.1.204:80
Response from Receiver: Hello from Receiver!
Response from Receiver: Hello from Receiver!
Response from Receiver: Hello from Receiver!
Response from Receiver: Hello from Receiver!
Response from Receiver: Hello from Receiver!
```

**For the Receiver app:**
    ```bash
    kubectl logs <receiver-pod-name>
    ```

You should see output similar to:
``` 
k logs receiver-6fbffb4b6d-7h4s2
Receiver listening at http://localhost:3000
Received request from Sender
Received request from Sender
```

### Step 6: Clean Up
To delete all deployed resources:

```bash
kubectl delete -f . --force --grace-period=0
```

---

Replace `<sender-pod-name>` and `<receiver-pod-name>` with the actual names of your pods. This README provides a concise guide on deploying and interacting with your Kubernetes applications.

