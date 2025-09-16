---
id: deployment-options
title: Private Deployment Options
sidebar_label: Deployment Options
---

A private deployment of Vectara is designed to work with your existing 
infrastructure choices, offering flexible deployment models to match your 
organization's specific requirements.

## Deployment models

### Traditional on-premises

Install Vectara on your physical servers within your own data center:

- **Complete control**: Full ownership of hardware and infrastructure
- **Air-gapped support**: Deploy in environments with no external internet access
- **Custom hardware**: Leverage your existing server investments
- **Maximum security**: Keep all data and processing within your physical premises

### Private cloud (VPC)

Deploy within your cloud VPC on major cloud providers:

- **AWS**: Deploy in your AWS VPC with full network isolation
- **Google Cloud**: Utilize GCP's secure VPC networking
- **Microsoft Azure**: Leverage Azure's private cloud capabilities
- **Hybrid ready**: Seamlessly integrate with existing cloud infrastructure

### Hybrid configurations

Mix private and cloud deployments based on your needs:

- **Multi-region**: Deploy across multiple geographic locations
- **Workload distribution**: Different deployment types for different use cases
- **Gradual migration**: Start with private deployment and migrate to cloud over time
- **Disaster recovery**: Cross-platform backup and recovery options

## Infrastructure flexibility

### Kubernetes environments

Private deployment supports various Kubernetes distributions:

- **OpenShift**: Enterprise-grade Red Hat Kubernetes platform
- **Tanzu**: VMware's modern application platform
- **Managed services**: EKS (AWS), GKE (Google Cloud), AKS (Azure)
- **Custom Kubernetes**: Standard kubeadm or K3s deployments

### Storage solutions

Flexible storage options for both persistent and object storage:

- **Persistent storage**: Work with your existing block storage solutions
- **Object storage**: Support for S3-compatible storage systems
- **High performance**: Optimized for high IOPS workloads
- **Scalable**: Grows with your data and performance needs

### Monitoring and logging integration

Integrate with your existing operational tools:

- **Monitoring systems**: Compatible with Prometheus, Grafana, and enterprise monitoring
- **Logging platforms**: Export logs to your existing log management systems
- **Alerting**: Integrate with your current alerting infrastructure
- **Dashboards**: Custom dashboards for operational visibility

### GPU acceleration

Support for GPU acceleration to optimize performance:

- **NVIDIA GPU support**: Optimized for NVIDIA GPU infrastructure
- **Performance benefits**: Accelerated AI workloads and faster query responses
- **Flexible configuration**: Scale GPU resources based on workload demands
- **Cost optimization**: Right-size GPU allocation for your use cases

## Operational considerations

### Updates and maintenance

Your IT team maintains control while Vectara provides support:

- **Controlled updates**: Apply updates on your schedule during maintenance windows
- **Security patches**: Regular security updates with flexible deployment timing
- **Version control**: Choose when to upgrade to new platform versions
- **Rollback capability**: Safe rollback procedures if issues arise

### Performance optimization

Optimize deployment for your specific requirements:

- **Resource allocation**: CPU, memory, and storage sizing guidance
- **Network configuration**: Optimize for your network topology
- **Load balancing**: Distribute traffic across multiple nodes
- **Caching strategies**: Implement caching for improved response times

### Integration points

Seamless integration with your existing systems:

- **Authentication systems**: SAML, OIDC, and enterprise directory integration
- **API gateways**: Work with your existing API management infrastructure
- **CI/CD pipelines**: Integrate with your deployment automation
- **Backup systems**: Compatible with enterprise backup solutions
