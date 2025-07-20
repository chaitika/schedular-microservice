# Scheduler Microservice

A lightweight and efficient scheduler microservice that enables users to create, manage, and view scheduled jobs with ease.

## Prerequisites

- **Docker** - The only dependency required to run this project

## Installation & Setup

1. **Clone the repository**

   bash
   git clone git@github.com:chaitika/schedular-microservice.git
   cd scheduler-microservice
   

2. **Install dependencies**
   bash
   npm install
   

## Running the Application

This project includes a convenient Makefile for easy project management.

### Backend Server

Start the scheduler microservice backend:

bash
make dev


### Frontend Interface

In a separate terminal, launch the web interface:

bash
make frontend


The frontend provides an intuitive interface to:

- Create new scheduled jobs
- View existing jobs
- Monitor job status
