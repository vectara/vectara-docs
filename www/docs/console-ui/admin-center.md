---
id: admin-center
title: Vectara Admin Center
sidebar_label: Vectara Admin Center
---

import CodePanel from '@site/src/theme/CodePanel';


The Vectara Admin Center enables enterprise users to manage their on-premise 
Vectara deployment with a unified, administrative interface. This interface 
provides essential capabilities to manage teams and users, configure global 
settings, monitor resource usage, and control tenant-level quotas. This 
reduces operational overhead, enhances security, and improves scalability.

This guide outlines the key features and example tasks and goals of the Admin 
Center, tailored to the needs of Vectara administrators.

![Vectara Admin Center](/img/admin-center-dashboard.png)

## Key functional areas

* **Admin dashboard overview**: Monitor system health, view key metrics about 
  accounts, queries, and indexing requests, usage, and component details.
* **Tenant management:** Monitor tenant account activity, user distribution, 
  storage consumption, and adjust account-specific quota adjustments
* **User management**: Manage users and permissions within a customer account, 
  ensuring secure access control.
* **Corpora management**: View, edit, and delete corpora within a customer account to 
  optimize storage and performance.
* **Model management**: Manage available LLMs for the platform.
* **Text encoder management**: Manage available text encoders for the platform.


## Admin Dashboard Overview

The **Admin Dashboard** serves as the central hub for monitoring the Vectara 
instance, providing a snapshot of system health, usage metrics, and account 
activity. It displays metrics such as total tenants, queries, indexing 
requests, query histories, documents, document parts, storage, stale corpora, 
and system health indicators, all filtered by individual tenants for optimal performance.

* **View key metrics**: Track platform adoption and performance by displaying total 
  accounts, queries, indexing requests, and usage details.  
Viewing all accounts and queries helps administrators assess usage trends, enabling 
data-driven decisions that enhance platform reliability and boost customer 
satisfaction by ensuring consistent performance.
* **Access detailed account views**: Manage accounts effectively by accessing detailed 
  views, including query graphs, user lists, and corpora.  
Reviewing query graphs and user lists for an account enables precise resource 
allocation, improving operational efficiency and enhancing the customer experience.
* **Create new accounts and users**: Expand platform usage by initiating new account 
  or user creation.  
Adding a new account supports new customers, driving platform adoption and increasing 
revenue potential for Vectara.
* **Assess performance**: Identify bottlenecks by reviewing metrics like Global FCS 
  Average and average query time.  
Monitoring a 582 ms query time helps optimize performance, ensuring fast responses 
and enhancing user satisfaction, which supports customer retention.


### Dashboard Actions

* Click **View tenants** to see a list of all tenants. You can also view total 
  queries or indexing requests across tenants.

## Manage Tenants

**Tenant management** enables administrators to oversee all tenant accounts within 
a Vectara on-premise environment. It provides a centralized view of tenant 
activity, user distribution, storage consumption, and allows you to adjust 
tenant-specific quotas.

* **View users:** View users that are part of a specific tenant.
* **Adjust tenant quotas:** Update global defaults for users, corpora, and storage 
  at the tenant level to accommodate specific customer needs or enforce usage 
  constraints.


### Tenant Actions

* Filter tenants by ID or status using the dashboard filters.
* Use the Actions column to View Users or Manage Quotas for each tenant.
* Launch the Manage Quotas model to update corpora or storage quotas.


## Manage Users

**User and access management** provides tools to oversee users within a specific 
tenant account, displaying details like ID, email, account ID, role, status, 
last login, queries, data ingestion, storage, and usage of standard and gpt-4.

### Manage Corpora

**Corpora management** enables administrators to view and manage corpora within 
a specific customer account, providing details like key, name, description, 
type, status, and creation date.

### Corpora Actions

* Rebuild a corpus.


## Model Management

**Model management** enables administrators to manage custom LLMs globally, displaying 
details like ID, model name, description, and whether or not it's enabled. 
Registered models are available to all accounts, ensuring consistent functionality.

#### Tasks and Goals

* **View model parameters**: Ensure proper integration by listing model parameters.  
Reviewing a Llama 3.3 model with an api.example.com endpoint supports advanced 
features, increasing customer value through enhanced platform capabilities.


### Model Actions

* Click **Add model** for new registrations.
* Enable/disable or edit models from the **Action** column.

## Add Model

The **Add model** section provides a form to register new custom models for global use, 
capturing details like name, description, API endpoint, and API key (partially masked 
for security). This ensures secure and centralized model integration across the platform.

#### Tasks and Goals

* **Register new model**: Add a model to enable advanced functionality.  
Registering a Llama 3.3 model enables on-prem generation, enhancing platform 
flexibility and supporting advanced customer use cases, which drives adoption.
* **Save configuration**: Store model details for immediate global availability.  
Saving a model configuration ensures usability, accelerating deployment and improving 
customer satisfaction by enabling rapid feature access.
* **Cancel registration**: Prevent misconfigurations by discarding changes.  
Canceling a model addition maintains system integrity, ensuring reliability 
and avoiding costly errors for enterprises.


### Actions

* Click **Save** to register or **Cancel** to discard.


## Manage Global Settings

**Global configuration management** enables administrators to define system-wide settings for search, usage limits, external authorization, data ingestion, and model management. By offering default and advanced configuration options, it ensures consistency, reduces misconfiguration risks, and supports scalability across all accounts.

* **Configure system settings**
    * Adjust search page, usage limits, external authorization, and data ingestion settings.
    * Setting a usage limit prevents resource overuse, reducing operational costs and ensuring fair resource distribution for enterprise customers.
* **Manage global models**
    * Enhance functionality by registering and managing custom encoders and generative LLMs for all accounts.
    * Registering a custom encoder improves data processing, enabling advanced RAG applications and increasing the platform’s value for customers.
* **Manage text encoders**
    * Register and configure text encoders used to create embeddings.
    * Specify name, description, API endpoint, and API key.
* **Manage generative LLMs**
    * Register and manage LLMs used to generate query responses
    *  Includes settings for name, description, endpoint, and key.
* **Manage system prompts**
    * Create and maintain reusable prompts that guide LLM behavior.
    * Each includes name, description, and prompt content.
* **Set generation presets**
    * Define system-wide defaults for generation configuration, such as temperature, max tokens, and presence penalty.
    * Creating a preset ensures consistent outputs and reduces support needs.


### Global Setting Actions

* Add or remove text encoders.
* Add or remove generative LLMs.
* Add or edit system prompts.
* Add or modify generation presets.
* Adjust usage limits and other global configuration values.

The Vectara Admin Center lets you submit technical issues or UI problems to the Vectara support team. This function enhances issue resolution speed, and maintains platform reliability across tenant environments.

Use the Report a Bug dialog to log unexpected behavior, errors, or anomalies when using this application. Administrators can provide detailed context, expected outcomes, and reproduction steps to assist Vectara in rapid diagnostics and resolution.

* Include precise timestamps and user IDs if available.
* Attach relevant screenshots or logs when emailing the report.
* Use clear, concise language to describe actions and outcomes.

**To report a bug:**

1. Click the **Report a Bug** button located at the top-right of the Admin Center.
2. Fill out the report form:
    * Description
    * Expected behavior
    * Observed behavior
    * Context
3. Click **Download Report** to export the bug report file.
4. Email this file to support@vectara.com