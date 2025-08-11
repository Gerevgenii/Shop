import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDfMh3qG1p34etHgaeaowgobY6_zA5S74c',
	authDomain: 'myshop-da574.firebaseapp.com',
	projectId: 'myshop-da574',
	storageBucket: 'myshop-da574.firebasestorage.app',
	messagingSenderId: '528554979379',
	appId: '1:528554979379:web:d815341266d6b16c9df346',
	databaseURL: 'https://myshop-da574-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
