import { bootstrapApplication } from '@angular/platform-browser';
import { inject } from '@vercel/analytics';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// Cookieless page-view analytics. It only reports once Web Analytics is enabled for the project in Vercel.
inject();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
