// Recording MIDI signals

		var play_button_clicked;
		var harm_button_clicked;
		var complete_button_clicked;
		var second_button_clicked;

		var send; // Boolean variable indicating if we are recording MIDI signals or not

		var melody_channel; // Variable used to retrieve the number of the melody channel
		var chord_channel; // Variable used to retrieve the number of the chords channel

		var first_melody_index; // First index of melody_array array in the subsequent recordings
		var last_melody_index; // Variable keeping track of the last index of melody_array in the subsequent recordings

		var first_melody_index; // First index of chord_array array in the subsequent recordings, used to track the first confrontation for the min note in the function getMinNote
		var last_chord_index; // Variable keeping track of the last index of chord_array in the subsequent recordings

		var first_min_index; // First index of MinNote array in the subsequent recordings
		var min_note_i; // Index used to populate min_note_array and min_note_time in the function getMinNote AND to keep track of the last index of min_note_array in the function record

		var counter_second; //keeps track of the index on the second counterpoint array
		var last_note_second = 0;

	// Getting MIDI Message for chords and melody
		var i; // melody_array index in getMIDIMessage
		var melody_array = new Array; //Array in which we store all the informations regarding the melody notes
		var melody_time; //Array keeping track of all the Timestamp of the different melody notes
	
		var j; // NO
		var chord_array = new Array; // Array containing the informations concerning the raw chords imported from the MIDI
		var chord_time; //Array keeping track of all the Timestamp of the different chord notes

	// Getting the durations for the note arrays
		//MinNote
		var m; // Index used to compute the calculation od the lowest note of the chord in the function getMinNote
		var min_note; // Lowest note for each chord
		var min_note_index; // Index of the lowest note of the chord in chord_array
		var min_note_array; // Array containing the data from each lowest note computed from each chord
		var min_note_time;  // Array containing the Timestamp of each lowest note computed from each chord
		var min_note_i; // Index used to populate min_note_array and min_note_time in the function getMinNote AND to keep track of the last index of min_note_array in the function record
		var melody_second = new Array;

		//Chords
		var chord_i; // Index used to populate the arrays used to create the new chords
		var chord_duration; //Array containing the duration of the chords notes
		var chordOn; // Boolean array stating if the chord note is being played (true) or there is a pause (false)
		var chordOnMin = new Array;

			//Ctp1
		var ctp1_array = new Array; // Array containing the First Species Counterpoint notes
		var ctp1On = new Array; // Boolean array stating if the counterpoint note is being played (true) or there is a pause (false)

		var cons_notes; // Array containing all the possible distances used to create CONSONANT notes for the First and Second Species Counterpoints

			//Ctp2
		var ctp2_i; // Index used to populate all the variables concerning the Second Species Counterpoint notes
		var ctp2_duration = new Array; // Array containing the Second Species Counterpoint notes' durations
		var ctp2_array = new Array; // Array containing the  the Second Species Counterpoint notes derived by min_note_array
		var ctp2On = new Array; // Boolean array stating if the counterpoint note is being played (true) or there is a pause (false)

		var diss_notes; // Array containing all the possible distances used to create DISSONANT notes for the Second Species Counterpoint
		
		//Melody
		var note_i; // Index used to compute the durations of melody_array in the function makeNoteDuration
		var melody_duration; //Variable containing the duration of the melody notes
		var noteOn;	// Boolean array stating if the melody note is being played (true) or there is a pause (false)
		var melody_dur = new Array;

	// Managing color synchronization
		var harmony; // Boolean value to synchronize the changing of the color of the Play Complete Melody in the case in which chords and melody duration arrays have different total duration
		var second;

	// Playing notes
		var midi_chord_freq; // Frequency value concerning the chord in the MIDI Keyboard
		var keyb_chord_freq; // Chord Frequency value corresponding to the value of the MIDI Keyboard
	
	// Melody playing ALONE
		var min_midi_freq; // Minimum frequency value in the MIDI Keyboard
		var min_keyb_freq; // Minimum frequency value corresponding to the minimum value of the MIDI Keyboard

		var k; // Index used to span the elements contained in melody_array and play them

		var volume_slider_1; // Element controlling the volume slider of melody alone
		var output_1; // Element controlling the intensity of the gain of the volume slider of melody alone
		var valore_gain; // Value of the gain for the reproduction of melody alone

		var c; // AudioContext variable for the function playMelody
		var osc; // Oscillator connected to context that plays melody_array
		var gainNode; // Gain node connected to osc
		var analyserMelody;
		var bufferLength;
		var dataArray;

	// First Species Ctp chords reproduction ALONE
		var g; // Index used to span the elements concerning the First Species Ctp (min_not_array and ctp1_array) and play them

		var volume_slider_2; // Element controlling the volume slider of First Species Ctp Chords alone
		var output_2; // Element controlling the intensity of the gain of the volume slider of First Species Ctp Chords alone
		var valore_gain_2; // Value of the gain for the reproduction of First Species Ctp Chords alone

		var context; // AudioContext variable for the function playFirstCtp that plays the First Species Ctp chords
		var oscNode1; // Oscillator connected to context that plays min_note_array
		var oscNode2; // Oscillator connected to context that plays ctp1_array
		var oscNode3; 
		var constantNode; // Node that assures synchronicity between min_note_array and ctp1_array
		var gainNode1; // Gain node connected to OscNode1
		var gainNode2; // Gain node connected to OscNode2
		var gainNode3;
		var analyser_min; //analysers node to get a time representation of the played piece
		var analyser_ctp1
		var bufferLength_min;
		var bufferLength_ctp1;
		var dataArray_min;
		var dataArray_ctp1;

	// Second Species Ctp chords reproduction ALONE
		var y; // Index used to span the elements concerning the Second Species Ctp (min_note_array and ctp2_array) and play them

		var volume_slider_4; // Element controlling the volume slider of Second Species Ctp Chords alone
		var output_4; // Element controlling the intensity of the gain of the volume slider of Second Species Ctp Chords alone
		var valore_gain_4; // Value of the gain for the reproduction of Second Species Ctp Chords alone
		
		var context_second;
		var osc_second;
		var gainSecond;
		var analyser_second;
		var bufferLength_second;
		var dataArray_second;

		var context_first; // AudioContext variable for the function ???
		var osc_chord;
		var analyser_first;
		var bufferLength_first;
		var dataArray_first;

	// First Species Ctp chords and Melody reproduction
		var volume_slider_3_melody; // Element controlling the volume slider of the MELODY for the reproduction of melody and ctp notes together
		var volume_slider_3_chords; // Element controlling the volume slider of the CHORDS for the reproduction of melody and ctp notes together
		var output_3_melody; // Element controlling the intensity of the gain of the volume slider of the MELODY for the reproduction of melody and ctp notes together
		var output_3_chords; // Element controlling the intensity of the gain of the volume slider of the CHORDS for the reproduction of melody and ctp notes together
		var valore_gain_3_melody; // Value of the gain for the MELODY for the reproduction of melody and ctp notes together
		var valore_gain_3_chords; // Value of the gain for the CHORDS for the reproduction of melody and ctp notes together

	// Variables tuning the canvas showing the time evolution of the waves reproduced
		var time_canvas;
		var canvas_context;




	//record button functionalities:
		//request MIDI Access (on MIDI success)
		//compute the chords duration array the first species ctp notes
		//keep track of some important indexes

		send = false;
		last_melody_index = 0;
		last_chord_index = 0;
		min_note_i = 0;

		document.querySelectorAll("#rec_button").forEach(toggleRecord);
		
		function toggleRecord(item){
			item.onclick = record;
		}

		function record(){
			this.classList.toggle("clicked_button");
			send = !send;
			console.log(send + " record");
			if (send){
				this.firstChild.data = "Stop";
				navigator.requestMIDIAccess().then(onMIDISuccess);
				first_melody_index = last_melody_index;
				console.log(first_melody_index);
				//first_chord_index = last_chord_index;
				//first_min_index = min_note_i;
				counter_second = last_note_second;
				clearScreen();
			}
			else{
				this.firstChild.data = "Start";
				getChordDuration();
				last_melody_index = melody_array.length;
				last_note_second = ctp2_array.length;
			}
		}
	
	// If send is true, so if we are recording
		i = 0;
		j = 0;
		var data_array = new Array;
		var data_time = new Array;

		melody_time = new Array;

		function onMIDISuccess(midiAccess) {
			console.log(midiAccess);
		    inputs = midiAccess.inputs;
		    outputs = midiAccess.outputs;
		    
		    for (var input of midiAccess.inputs.values()){
		        input.onmidimessage = getMIDIMessage;
		    }
		}

		melody_duration = 0.7;

		function getMIDIMessage(midiMessage) {
			message = midiMessage;
			if (message.data[0] == 145){
				data_array[i] = message.data;
				data_time[i] = message.timeStamp;

				if (i == 0){
					melody_array[j] = data_array[i];
					melody_time[j] = data_time[i];
					midi_freq = melody_array[j][1];
					keyb_freq = min_keyb_freq*Math.pow(2,(midi_freq - min_midi_freq)**1/12);
					drawMelody(midi_freq);
					playMelody(keyb_freq);
					j++;
				} else if (data_time[i] != data_time[i-1]){
					melody_array[j] = data_array[i];
					melody_time[j] = data_time[i];
					midi_freq = melody_array[j][1];
					keyb_freq = min_keyb_freq*Math.pow(2,(midi_freq - min_midi_freq)**1/12);
					drawMelody(midi_freq);
					playMelody(keyb_freq);
					j++;
				}
				i++;
			}
		}

	// Creating the duration arrays for the First and Second Species Counterpoints
		//First Species ctp notes
		ctp1_array = new Array;
		var cons_first_notes = [0,7,12];
		var cons_last_notes = [0,12];
		cons_notes = [3,4,8,9];

		//Second Species ctp notes
		ctp2_duration = new Array;
		ctp2_array = new Array;
		diss_notes = [1,2,3,4,5,6,8,9,10,11];
		dx_2ctp = new Array;

		//first_min_index = min_note_i; remember
		function getChordDuration(){
			ctp2_duration = ctp2_duration.concat(Array((melody_array.length-first_melody_index)*2-1));
			ctp2_duration = ctp2_duration.fill(melody_duration/2,counter_second,ctp2_duration.length-1);
			ctp2_duration = ctp2_duration.fill(melody_duration,ctp2_duration.length-1);
			console.log(ctp2_duration);
			dx_2ctp.length = ctp2_duration.length;
			dx_2ctp = dx_2ctp.fill(dx/2,counter_second,ctp2_duration.length-1);
			dx_2ctp = dx_2ctp.fill(dx,ctp2_duration.length-1);

			ctp2_i = counter_second;

			for (chord_i = first_melody_index; chord_i<melody_array.length; chord_i++){
			// First Species Ctp array
				ctp1_array[chord_i] = melody_array[chord_i][1] + cons_notes[Math.floor(Math.random() * cons_notes.length)];

				if (ctp2_i<ctp2_duration.length){
				// Second Species Ctp array	
				//consonant notes
					ctp2_array[ctp2_i] = melody_array[chord_i][1] + cons_notes[Math.floor(Math.random() * cons_notes.length)];
				//dissonant notes
					ctp2_array[ctp2_i+1] = melody_array[chord_i][1] + diss_notes[Math.floor(Math.random() * cons_notes.length)];
				//melody notes for 2ctp
					melody_second[ctp2_i] = melody_array[chord_i][1];
					melody_second[ctp2_i+1] = melody_array[chord_i][1];
					ctp2_i += 2;
				}
			}
			
			ctp2_array.splice(ctp2_array.length-1,ctp2_array.length);
			console.log("CTP2 ARRAY LENGTH " + ctp2_array.length);
			melody_second.splice(melody_second.length-1,melody_second.length);
			ctp2_array[ctp2_array.length-1] =  melody_second[melody_second.length-1] + cons_notes[Math.floor(Math.random() * cons_notes.length)];

			ctp1_array[first_melody_index] = melody_array[first_melody_index][1] + cons_first_notes[Math.floor(Math.random() * cons_first_notes.length)];
			//console.log("ctp1_array[0] = " + ctp1_array[first_melody_index]);

			ctp2_array[counter_second] = melody_array[first_melody_index][1] + cons_first_notes[Math.floor(Math.random() * cons_first_notes.length)];
			ctp2_array[counter_second+1] = melody_array[first_melody_index][1] + diss_notes[Math.floor(Math.random() * diss_notes.length)];

			melody_second[counter_second] = melody_array[first_melody_index][1];
			melody_second[counter_second+1] = melody_array[first_melody_index][1];

			//Clausola vera
			if ((melody_array[melody_array.length-1][1] - melody_array[melody_array.length-2][1] == 1) || (melody_array[melody_array.length-1][1] - melody_array[melody_array.length-2][1] == 2)){
				ctp1_array[melody_array.length-1] = melody_array[melody_array.length-1][1] + cons_last_notes[Math.floor(Math.random() * cons_last_notes.length)];
				ctp1_array[melody_array.length-2] = ctp1_array[melody_array.length-1] + 2;
				
				ctp2_array[melody_second.length-1] = melody_array[melody_array.length-1][1] + cons_last_notes[Math.floor(Math.random() * cons_last_notes.length)];
				ctp2_array[melody_second.length-2] = ctp2_array[melody_second.length-1];
				ctp2_array[melody_second.length-3] = ctp2_array[melody_second.length-1] + 2;
				/*console.log("ctp2_array[length-2] = " + ctp2_array[melody_array.length-2]);
				console.log("ctp2_array[length-1] = " + ctp2_array[melody_second.length-1]);*/

			} else if ((melody_array[melody_array.length-2][1] - melody_array[melody_array.length-1][1] == 2)||(melody_array[melody_array.length-2][1] - melody_array[melody_array.length-1][1] == 1)){
				ctp1_array[melody_array.length-1] = melody_array[melody_array.length-1][1] + cons_last_notes[Math.floor(Math.random() * cons_last_notes.length)];
				ctp1_array[melody_array.length-2] = ctp1_array[melody_array.length-1] - 1;

				ctp2_array[melody_second.length-1] = melody_array[melody_array.length-1][1] + cons_last_notes[Math.floor(Math.random() * cons_last_notes.length)];
				ctp2_array[melody_second.length-2] = ctp2_array[melody_second.length-1];
				ctp2_array[melody_second.length-3] = ctp2_array[melody_second.length-1] - 1;
			}

		}

	// Creating the duration array for the Melody
		note_i = 0;

		play_button_clicked = document.querySelector("#play_button");
		harm_button_clicked = document.querySelector("#harm_button");
		complete_button_clicked = document.querySelector("#play_all");
		second_button_clicked = document.querySelector("#second_ctp");

// Playing notes
		harmony = false;

		min_midi_freq = 21;
		min_keyb_freq = 27.5;

	//Playing the main melody
		k = 0;

		// Toggle PLAY button
		document.querySelectorAll("#play_button").forEach(togglePlayMelody);
		
		function togglePlayMelody(item){
			item.onclick = callstartMelody;
		}
		
		function callstartMelody(){
			k = first_melody_index;
			harmony = false;
			play_button_clicked.classList.toggle("clicked_button");
			clearScreen();
			startMelody();
		}
		
		function startMelody(){
			if (k<melody_array.length){
				//Melody notes
				midi_freq = melody_array[k][1];
				keyb_freq = min_keyb_freq*Math.pow(2,(midi_freq - min_midi_freq)**1/12);
				playMelody(keyb_freq);
				drawMelody(midi_freq);
				//console.log(midi_freq + " = " + keyb_freq + " durata " + melody_duration+ " ON" + " k = " + k);
				k++;
				setTimeout(startMelody,melody_duration*1000);
			}else {
				if (!harmony){
					play_button_clicked.classList.toggle("clicked_button");

				}
				harmony = true;
			}
		} 
		

		// Managing VOLUME
		volume_slider_1 = document.getElementById("volumeControl_1");
		document.querySelectorAll("#volumeControl_1").forEach(toggleVolumeMelody);
		output_1 = document.getElementById("span1");
		output_1.innerHTML = volume_slider_1.value;
		valore_gain = 0.5;


		function toggleVolumeMelody(item){
			item.onmouseup = changeVolumeMelody;
		}

		function changeVolumeMelody(event) {
			output_1.innerHTML = volume_slider_1.value;
			valore_gain = output_1.innerHTML;
			//console.log("valore_gain_1 = " + valore_gain);
		}

		// Actual function starting the oscillators
		function playMelody(freq){
			c = new AudioContext();

		    osc = c.createOscillator();

		    gainNode = c.createGain();

		    gainNode.gain.value = valore_gain;
		
		    osc.connect(gainNode);
		    gainNode.connect(c.destination);
			
		    osc.frequency.value = freq;

		    osc.start();

		    gainNode.gain.linearRampToValueAtTime(valore_gain,melody_duration/4); 
		   	gainNode.gain.linearRampToValueAtTime(0,melody_duration); 
		    
		   // if (harmony == false){drawMelody();}

		    osc.stop(melody_duration);
		}

	//Playing Melody and First Species Ctp notes
		g = 0;

		document.querySelectorAll("#harm_button").forEach(togglePlayFirstCtp);
			
		function togglePlayFirstCtp(item){
			item.onclick = callStartFirstCtp;
		}

		function callStartFirstCtp(){
			g = first_melody_index;
			harmony = false;
			harm_button_clicked.classList.toggle("clicked_button");
			clearScreen();
			StartFirstCtp();
		}

		function StartFirstCtp(){
			if (g<melody_array.length){
				//Min chord Notes	
				midi_chord_freq = melody_array[g][1];
				keyb_chord_freq = min_keyb_freq*Math.pow(2,(midi_chord_freq - min_midi_freq)**1/12);
				//Ctp Notes
				midi_first_ctp = ctp1_array[g];
				keyb_first_ctp = min_keyb_freq*Math.pow(2,(midi_first_ctp - min_midi_freq)**1/12);
				//console.log(keyb_chord_freq + " + " + keyb_first_ctp);
				drawChords(midi_chord_freq,midi_first_ctp);
				playFirstCtp(keyb_chord_freq,keyb_first_ctp);
				setTimeout(StartFirstCtp,melody_duration*1000);
				g++;
				
			} else {
				if (harmony){
					complete_button_clicked.classList.toggle("clicked_button");
				} else {
					harm_button_clicked.classList.toggle("clicked_button");
				}
			} 
		}

		//Managing VOLUME
		volume_slider_2 = document.getElementById("volumeControl_2");
		document.querySelectorAll("#volumeControl_2").forEach(toggleVolumeFirstCtp);
		output_2 = document.getElementById("span2");
		output_2.innerHTML = volume_slider_2.value;
		valore_gain_2 = 0.5/3;

		function toggleVolumeFirstCtp(item){
			item.onmouseup = changeVolumeFirstCtp;
		}

		function changeVolumeFirstCtp(event) {
			output_2.innerHTML = volume_slider_2.value;
			valore_gain_2 = (volume_slider_2.value)/3;
			constantNode.offset.value = valore_gain_2;
			//console.log("valore gain = " + valore_gain_2);
			//console.log("gain value = " + constantNode.offset.value);
		}
	

		function playFirstCtp(freq1,freq2) {

			context = new AudioContext();

			gainNode1 = context.createGain();
			gainNode1.gain.value = valore_gain_2;
			 
			gainNode2 = context.createGain();
			gainNode2.gain.value = valore_gain_2;

			constantNode = context.createConstantSource();
			constantNode.connect(gainNode1.gain);
			constantNode.connect(gainNode2.gain);
			constantNode.offset.value = valore_gain_2;
			constantNode.start();

		  	oscNode1 = context.createOscillator();
		  	oscNode1.frequency.value = freq1;
		  	oscNode1.type = "sine";

			oscNode2 = context.createOscillator();
			oscNode2.frequency.value = freq2;
			oscNode2.type = "sine";

			oscNode1.connect(gainNode1);
			gainNode1.connect(context.destination);

			oscNode2.connect(gainNode2);
			gainNode2.connect(context.destination);

			oscNode1.start();
			oscNode2.start();

			gainNode1.gain.linearRampToValueAtTime(valore_gain_2,melody_duration/4); 
  			gainNode1.gain.linearRampToValueAtTime(0,melody_duration);

  			gainNode2.gain.linearRampToValueAtTime(valore_gain_2,melody_duration/4); 
			gainNode2.gain.linearRampToValueAtTime(0,melody_duration);

			oscNode1.stop(melody_duration);
			oscNode2.stop(melody_duration);
		}


	//second counterpoint 
		document.querySelectorAll("#second_ctp").forEach(toggle_Second_ctp);
		
		function toggle_Second_ctp(item){
			item.onclick = startPlayingAll_Second;
		}

		y = 0;

		function startPlayingAll_Second(){
				
			k = first_melody_index;
			g = first_melody_index;
			y = counter_second;
			harmony = true;
			second_button_clicked.classList.toggle("clicked_button");
			clearScreen();
			startPlayingSecondCtp();

		}

		function startPlayingSecondCtp(){

			if (y<ctp2_duration.length){
				//Ctp2 notes
				midi_freq_second = ctp2_array[y];
				keyb_freq_second = min_keyb_freq*Math.pow(2,(midi_freq_second - min_midi_freq)**1/12);

				//Min notes
				midi_chord_freq = melody_second[y];
				keyb_chord_freq = min_keyb_freq*Math.pow(2,(midi_chord_freq - min_midi_freq)**1/12);

				//console.log(keyb_chord_freq + " + " + keyb_freq_second);
				drawSecondCtp(midi_chord_freq,midi_freq_second,dx_2ctp[y]);
				playSecondCtp(keyb_freq_second,keyb_chord_freq);
				setTimeout(startPlayingSecondCtp, melody_duration*500);
				y++;

			} else if (harmony) {
				second_button_clicked.classList.toggle("clicked_button");
			}
		}

		function playSecondCtp(freq1,freq2){
			context_first = new AudioContext();
			
			osc_chord = context_first.createOscillator();
			gainFirst = context_first.createGain();

			osc_second = context_first.createOscillator();
			gainSecond = context_first.createGain();
			
			osc_chord.connect(gainFirst);
			gainFirst.connect(context_first.destination);

			osc_second.connect(gainSecond);
			gainSecond.connect(context_first.destination);
			
			gainFirst.gain.value = valore_gain_4;
			gainSecond.gain.value = valore_gain_4;

			constant_Node = context_first.createConstantSource();
			constant_Node.connect(gainFirst.gain);
			constant_Node.connect(gainSecond.gain);
			constant_Node.offset.value = valore_gain_4;
			constant_Node.start();

			osc_chord.frequency.value = freq1;
			osc_second.frequency.value = freq2;
			
			osc_second.start();
			osc_chord.start();
									
			gainSecond.gain.linearRampToValueAtTime(valore_gain_4,ctp2_duration[y]/4); 
		   	gainSecond.gain.linearRampToValueAtTime(0,ctp2_duration[y]); 
			
		//	drawSecondCtp();

			osc_second.stop(ctp2_duration[y]);
			osc_chord.stop(ctp2_duration[y]);
		}


		//managing VOLUME -->only controls the second counterpoint notes volume
		volume_slider_4 = document.getElementById("volumeControl_4");
		output_4 = document.getElementById("span4");
		output_4.innerHTML = volume_slider_4.value;
		valore_gain_4 = 0.5/3;

		document.querySelectorAll("#volumeControl_4").forEach(toggleVolumeSecondCtp);

		function toggleVolumeSecondCtp(item){
			item.oninput = changeVolumeSecondCtp;
		}

		function changeVolumeSecondCtp(event) {
			output_4.innerHTML = volume_slider_4.value;
			valore_gain_4 = (volume_slider_4.value)/3;
			constant_Node.offset.value = valore_gain_4;
			//console.log("valore_gain_4 = " + valore_gain_4);
			//console.log("valore_gain_4 = " + constant_Node.offset.value);
		}

	//CANVAS
		time_canvas = document.querySelector("#time_canvas");
		canvas_context = time_canvas.getContext("2d");

		var WIDTH = time_canvas.width;
		var HEIGHT = time_canvas.height;
		var h = HEIGHT/50;

		function clearScreen(){
			canvas_context.clearRect(0, 0, WIDTH, HEIGHT);
			x_canvas = 0;
		}

		var x_canvas;
		var y_canvas;
		var min_canvas = 43;
		var dy = HEIGHT/50;
		var dx = 20; 

		function drawRect(y_canvas,style,dx) {
			    canvas_context.beginPath();
			    canvas_context.fillStyle = style;
			    canvas_context.fillRect(x_canvas, y_canvas, dx, dy);
			    canvas_context.fill();
			    canvas_context.closePath();
		}


		function drawMelody(midiFreq) {
			y_canvas = (midiFreq - min_canvas)*dy;
			var style = "#0095DD";
			drawRect(y_canvas, style,dx);
			x_canvas += dx;
		}

		function drawChords(mFreq,ctpFreq) {
			y_canvas = (mFreq - min_canvas)*dy;
			var style = "#0095DD";
			y_1ctp = (ctpFreq - min_canvas)*dy;
			var style_ctp = "#FF8C00";
			drawRect(y_canvas, style,dx);
			drawRect(y_1ctp, style_ctp,dx);
			x_canvas += dx;
	      	
		}

		function drawSecondCtp(mFreq,ctpFreq,dx_array) {	
			y_canvas = (mFreq - min_canvas)*dy;
			var style = "#0095DD";
			y_1ctp = (ctpFreq - min_canvas)*dy;
			var style_ctp = "#FF8C00";
			dx = dx_array;
			drawRect(y_canvas, style,dx);
			drawRect(y_1ctp, style_ctp,dx);
			x_canvas += dx_array;
		}