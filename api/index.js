var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
var DB = require('./drugs');
var app = express();
app.use(cors())
app.use(bodyParser.json())


app.get('/', function (req, res) {
	res.status(200).send("<h1 align='center'>Please go through the documentation to get started</h1>")
});
app.get('/api/get-drug-classes', function (req, res) {
	res.status(200).json({
		'data': DB.medications
	});
});

app.get('/api/get-single-drug-class/:drugClass', function (req, res) {
	let dc = req.params.drugClass,
		op
	for (i = 0; i < DB.medications.length; i++) {
		if (DB.medications[i][dc])
		
			op = DB.medications[i][dc]
			
		
			
	}
	if (op)
		res.status(200).json({
			'data': op
		});
	else
		res.status(204).json({
			'Error': 'no data found'
		});

});


app.post('/api/add-drug-class', function (req, res) {
	let dc = req.body.drugClass
	DB.medications[0][dc] = []
	res.status(201).json({
		"success":true
	});
});


app.post('/api/delete-drug-class', function (req, res) {
	let dc = req.body.drugClass,flag=false
	if(DB.medications[0][dc]){
		delete DB.medications[0][dc]
		flag=true	
	}
	if(flag)
	res.status(200).json({
		"success":true
	});
	else
	res.status(204).json({
		"Error":'unable to delete the absence data'
	});
});


app.get('/api/get-single-medicine/:medicineName', function (req, res) {
	let mediname = req.params.medicineName,
		op
		keys = Object.keys(DB.medications[0])

	for (i = 0; i < keys.length; i++) {
		for (j = 0; j < DB.medications[0][keys[i]].length; j++) {
			if (DB.medications[0][keys[i]][j].name === mediname) {
                op=DB.medications[0][keys[i]][j];
                break;
			}
		}

	}
	if (op)
		res.status(200).json({
			'data': op
		});
	else
		res.status(204).json({
			'Error': 'data not found'
		});

});


app.post('/api/add-single-medicine', function (req, res) {
	let dc = req.body.drugClassName,
		data = req.body.data
	DB.medications[0][dc].push(data)

	res.status(200).json({
		"data":{"success":true}
	});
});

app.post('/api/update-single-medicine', function (req, res) {

	let mediname = req.body.medicineName,
		flag, keys = Object.keys(DB.medications[0]),
		data = req.body.data,
		updatekeys = Object.keys(data)

	for (i = 0; i < keys.length; i++) {

		for (j = 0; j < DB.medications[0][keys[i]].length; j++) {
			if (DB.medications[0][keys[i]][j].name === mediname) {
				for (k = 0; k < updatekeys.length; k++)
					DB.medications[0][keys[i]][j][updatekeys[k]] = data[updatekeys[k]]
					flag=true
			}
		}

	}
	if (flag)
		res.status(200).json({
			"data":{"success":true}
		});
	else
		res.status(201).json({
			"Error":'unable to update data not found'
		});

});


app.post('/api/delete-single-medicine', function (req, res) {
	let mediname = req.body.medicineName,
		flag, keys = Object.keys(DB.medications[0])
	for (i = 0; i < keys.length; i++) {
		for (j = 0; j < DB.medications[0][keys[i]].length; j++) {
			if (DB.medications[0][keys[i]][j].name === mediname) {
				delete DB.medications[0][keys[i]][j];
				flag=true
			}
		}
	}
	if (flag)
		res.status(200).json({
			"data":{"success":true}
		});
	else
		res.status(204).json({
			"Error":'unable to delete data not found'
		});

});



app.get('/*', function (req, res) {
	res.status(404).send("<h1 align='center'>something went wrong check the documentation</h1>")
});

app.listen(2000);