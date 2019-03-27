// Recording MIDI signals

		var play_button_clicked;
		var ctp1_button_clicked;
		var ctp2_button_clicked;

		var send; // Boolean variable indicating if we are recording MIDI signals or not

		var first_cf_index; // First index of melody_array array in the subsequent recordings
		var last_cf_index; // Variable keeping track of the last index of melody_array in the subsequent recordings

		var first_ctp2_index; //keeps track of the index on the Second Species counterpoint array
		var last_ctp2_index; //keeps track of the last index on the Second Species counterpoint array

	// Getting MIDI Message for chords and melody
		var i; // data_array index in getMIDIMessage
		var j; // melody_array index in getMIDIMessage
		var data_array;
		var data_time;
		var melody_array; //Array in which we store all the informations regarding the Cantus Firmus notes
	
	// Getting the durations for the note arrays
		//Cantus Firmus
		var melody_duration; //Variable containing the duration of the melody notes

		//Counterpoints creation
		var ctp_i; // Index used to populate the arrays used to create the new counterpoint notes
		var cons_first_notes
		var cons_last_notes
		var cons_notes; // Array containing all the possible distances used to create CONSONANT notes for the First and Second Species Counterpoints
		//var diss_notes; // Array containing all the possible distances used to create DISSONANT notes for the Second Species Counterpoint
		var e;

			//Ctp1
		var ctp1_array = new Array; // Array containing the First Species Counterpoint notes
		
			//Ctp2
		var ctp2_i; // Index used to populate all the variables concerning the Second Species Counterpoint notes
		var ctp2_duration; // Array containing the Second Species Counterpoint notes' durations
		var ctp2_array; // Array containing the  the Second Species Counterpoint notes
		
		//Copy of the Cantus Firmus
		var cf_ctp2;

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

	// First Species Ctp reproduction
		var g; // Index used to span the elements concerning the First Species Ctp (melody_array and ctp1_array) and play them

		var volume_slider_2; // Element controlling the volume slider of First Species Ctp alone
		var output_2; // Element controlling the intensity of the gain of the volume slider of First Species Ctp alone
		var valore_gain_2; // Value of the gain for the reproduction of First Species Ctp alone

		var context; // AudioContext variable for the function playFirstCtp that plays the First Species Ctp
		var oscNode1; // Oscillator connected to context that plays melody_array
		var oscNode2; // Oscillator connected to context that plays ctp1_array
		var constantNode; // Node that assures synchronicity between melody_array and ctp1_array
		var gainNode1; // Gain node connected to OscNode1
		var gainNode2; // Gain node connected to OscNode2

	// Second Species Ctp reproduction
		var y; // Index used to span the elements concerning the Second Species Ctp (cf_ctp2 and ctp2_array) and play them

		var volume_slider_4; // Element controlling the volume slider of Second Species Ctp alone
		var output_4; // Element controlling the intensity of the gain of the volume slider of Second Species Ctp alone
		var valore_gain_4; // Value of the gain for the reproduction of Second Species Ctp alone
		
		var ctp2_context; // AudioContext variable for the second counterpoint
		var ctp2_osc;
		var cf2_osc;
		var ctp2_gain;

	// Variables tuning the canvas showing the note evolution and the counterpoints
		var canvas_id;
		var canvas_context;
		var WIDTH;
		var HEIGHT;
		var h;
		var x_canvas;
		var y_canvas;
		var min_canvas;
		var y_c;
		var dy;
		var dx;

		var idx;
		var indice;
		var idc;
		var indice_idx_array;

		var idx_array = new Array;
		var half_tones = new Array;
		var possible_notes = new Array; //ARRAY IN CUI METTERE TUTTE LE POSSIBILI NOTE CHE APPARTENGONO ALLA TONALITA IN CUI SI STA SUONANDO E QUINDI SI POSSONO USARE 
											//PER IL CONTRAPPUNTO

		var right_key_note = new Array;

		var C_major = new Array;
		var D_major = new Array;
		var E_major = new Array;
		var F_major = new Array;
		var G_major = new Array;
		var A_major = new Array;
		var B_major = new Array;

		half_tones = [2,2,1,2,2,2,1,2,2,1,2,2,2,1,2,2,1,2,2,2,1,2,2,1,2,2,2,1];

		C_major[0] = 36;
		D_major[0] = 38;
		E_major[0] = 40;
		F_major[0] = 41;
		G_major[0] = 43;
		A_major[0] = 45;
		B_major[0] = 47;

		function keys(){
			for (var i=1;i<half_tones.length;i++){
				C_major[i] = C_major[i-1]+half_tones[i-1];
				D_major[i] = D_major[i-1]+half_tones[i-1];
				E_major[i] = E_major[i-1]+half_tones[i-1];
				F_major[i] = F_major[i-1]+half_tones[i-1];
				G_major[i] = G_major[i-1]+half_tones[i-1];
				A_major[i] = A_major[i-1]+half_tones[i-1];
				B_major[i] = B_major[i-1]+half_tones[i-1];
			}
		}


	//record button functionalities:
		//request MIDI Access (on MIDI success)
		//compute the chords duration array the first species ctp notes
		//keep track of some important indexes

		send = false;
		last_cf_index = 0;
		last_ctp2_index = 0;

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
				first_cf_index = last_cf_index;
				console.log(first_cf_index);
				first_ctp2_index = last_ctp2_index;
				clearScreen();
				keys();
			}
			else{
				this.firstChild.data = "Start";
				ctpMaking();
				last_cf_index = melody_array.length;
				last_ctp2_index = ctp2_array.length;
			}
		}
	
	// If send is true, so if we are recording
		i = 0;
		j = 0;
		data_array = new Array;
		data_time = new Array;
		melody_array = new Array;
		melody_duration = 0.7;

		function onMIDISuccess(midiAccess) {
			console.log(midiAccess);
		    inputs = midiAccess.inputs;
		    outputs = midiAccess.outputs;
		    
		    for (var input of midiAccess.inputs.values()){
		        input.onmidimessage = getMIDIMessage;
		    }
		}

		function getMIDIMessage(midiMessage) {
			message = midiMessage;
			if (message.data[0] == 145){
				data_array[i] = message.data;
				data_time[i] = message.timeStamp;

				if (i == 0){
					melody_array[j] = data_array[i];
					midi_freq = melody_array[j][1];
					keyb_freq = min_keyb_freq*Math.pow(2,(midi_freq - min_midi_freq)**1/12);
					drawMelody(midi_freq);
					playMelody(keyb_freq);
					j++;
				} else if (data_time[i] != data_time[i-1]){
					melody_array[j] = data_array[i];
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
		cons_first_notes = [0,7,12];
		cons_last_notes = [0,12];
		//cons_notes = [3,4,8,9];
		cons_notes = [4,9];

		//Second Species ctp notes
		ctp2_duration = new Array;
		ctp2_array = new Array;
		cf_ctp2 = new Array;
		//diss_notes = [1,2,3,4,5,6,8,9,10,11];
		dx_2ctp = new Array;

		//FUNZIONE CHE SCORRE LE NOTE NELL'ARRAY DI CTP GENERATO E CAPISCE SE VANNO BENE = APPARTENGONO TUTTE ALLA STESSA TONALITA
		idx = 0;
		indice = 0;
		idc = 0;
		indice_idx_array = 0;

		function rightKey_C(array){
			
			console.log("idx= " + idx + " indice= " + indice);
			//SALVA IN RIGHT_KEY_NOTE LE NOTE DI CONTRAPPUNTO CHE VANNO BENE, QUELLE SBAGLIATE LE METTE A ZERO
			for (var i=first_cf_index;i<array.length;i++){
				for (var j=first_cf_index;j<C_major.length;j++){
					if (array[i] == C_major[j]){
						right_key_note[idx] = array[i];
					}
				}
				idx++;
			}

			indice_idx_array = indice;

			//SALVA GLI INDICI DELLE NOTE DI CONTRAPPUNTO CHE VANNO CAMBIATE
			for (var i=first_cf_index;i<right_key_note.length;i++){
				if (!right_key_note[i]){
					right_key_note[i] = 0;
					idx_array[indice] = i;
					indice++;
				}
			}

			idx_array = idx_array.concat(Array((array.length-idx_array.length)));
			idx_array = idx_array.fill(0,indice);
		}

		function rightKey_D(array){
			
			console.log("idx= " + idx + " indice= " + indice);
			//SALVA IN RIGHT_KEY_NOTE LE NOTE DI CONTRAPPUNTO CHE VANNO BENE, QUELLE SBAGLIATE LE METTE A ZERO
			for (var i=first_cf_index;i<array.length;i++){
				for (var j=first_cf_index;j<D_major.length;j++){
					if (array[i] == D_major[j]){
						right_key_note[idx] = array[i];
					}
				}
				idx++;
			}

			indice_idx_array = indice;
			console.log(indice + " indice");

			//SALVA GLI INDICI DELLE NOTE DI CONTRAPPUNTO CHE VANNO CAMBIATE
			for (var i=first_cf_index;i<right_key_note.length;i++){
				if (!right_key_note[i]){
					right_key_note[i] = 0;
					idx_array[indice] = i;
					indice++;
				}
			}

			idx_array = idx_array.concat(Array((array.length-idx_array.length)));
			idx_array = idx_array.fill(0,indice);
		}

		function rightKey_E(array){
			
			//SALVA IN RIGHT_KEY_NOTE LE NOTE DI CONTRAPPUNTO CHE VANNO BENE, QUELLE SBAGLIATE LE METTE A ZERO
			for (var i=first_cf_index;i<array.length;i++){
				for (var j=first_cf_index;j<E_major.length;j++){
					if (array[i] == E_major[j]){
						right_key_note[idx] = array[i];
					}
				}
				idx++;
			}

			indice_idx_array = indice;

			//SALVA GLI INDICI DELLE NOTE DI CONTRAPPUNTO CHE VANNO CAMBIATE
			for (var i=first_cf_index;i<right_key_note.length;i++){
				if (!right_key_note[i]){
					right_key_note[i] = 0;
					idx_array[indice] = i;
					indice++;
				}
			}

			idx_array = idx_array.concat(Array((array.length-idx_array.length)));
			idx_array = idx_array.fill(0,indice);
		}

		function ctpMaking(){
			ctp2_duration = ctp2_duration.concat(Array((melody_array.length-first_cf_index)*2-1));
			ctp2_duration = ctp2_duration.fill(melody_duration/2,first_ctp2_index,ctp2_duration.length-1);
			ctp2_duration = ctp2_duration.fill(melody_duration,ctp2_duration.length-1);
			console.log(ctp2_duration);
			dx_2ctp.length = ctp2_duration.length;
			dx_2ctp = dx_2ctp.fill(dx/2,first_ctp2_index,ctp2_duration.length-1);
			dx_2ctp = dx_2ctp.fill(dx,ctp2_duration.length-1);

			ctp2_i = first_ctp2_index;

			for (ctp_i = first_cf_index; ctp_i<melody_array.length; ctp_i++){
			// First Species Ctp array
				ctp1_array[ctp_i] = melody_array[ctp_i][1] + cons_notes[Math.floor(Math.random() * cons_notes.length)];

				if (ctp2_i<ctp2_duration.length){
				// Second Species Ctp array	
				//consonant notes
					ctp2_array[ctp2_i] = melody_array[ctp_i][1] + cons_notes[Math.floor(Math.random() * cons_notes.length)];
				//dissonant notes
					ctp2_array[ctp2_i+1] = melody_array[ctp_i][1] + cons_notes[Math.floor(Math.random() * cons_notes.length)];
				//melody notes for 2ctp
					cf_ctp2[ctp2_i] = melody_array[ctp_i][1];
					cf_ctp2[ctp2_i+1] = melody_array[ctp_i][1];
					ctp2_i += 2;
				}
			}
			
			ctp2_array.splice(ctp2_array.length-1,ctp2_array.length);
			cf_ctp2.splice(cf_ctp2.length-1,cf_ctp2.length);

			//ctp2_array[ctp2_array.length-1] =  cf_ctp2[cf_ctp2.length-1] + cons_notes[Math.floor(Math.random() * cons_notes.length)];

			ctp1_array[first_cf_index] = melody_array[first_cf_index][1] + cons_first_notes[Math.floor(Math.random() * cons_first_notes.length)];

			ctp2_array[first_ctp2_index] = melody_array[first_cf_index][1] + cons_first_notes[Math.floor(Math.random() * cons_first_notes.length)];

			//Clausola vera
			if ((melody_array[melody_array.length-1][1] - melody_array[melody_array.length-2][1] == 1) || (melody_array[melody_array.length-1][1] - melody_array[melody_array.length-2][1] == 2)){
				ctp1_array[melody_array.length-1] = melody_array[melody_array.length-1][1] + cons_last_notes[Math.floor(Math.random() * cons_last_notes.length)];
				ctp1_array[melody_array.length-2] = ctp1_array[melody_array.length-1] + 2;
				
				ctp2_array[cf_ctp2.length-1] = melody_array[melody_array.length-1][1] + cons_last_notes[Math.floor(Math.random() * cons_last_notes.length)];
				ctp2_array[cf_ctp2.length-2] = ctp2_array[cf_ctp2.length-1];
				ctp2_array[cf_ctp2.length-3] = ctp2_array[cf_ctp2.length-1] + 2;
				/*console.log("ctp2_array[length-2] = " + ctp2_array[melody_array.length-2]);
				console.log("ctp2_array[length-1] = " + ctp2_array[cf_ctp2.length-1]);*/

			} else if ((melody_array[melody_array.length-2][1] - melody_array[melody_array.length-1][1] == 2)||(melody_array[melody_array.length-2][1] - melody_array[melody_array.length-1][1] == 1)){
				ctp1_array[melody_array.length-1] = melody_array[melody_array.length-1][1] + cons_last_notes[Math.floor(Math.random() * cons_last_notes.length)];
				ctp1_array[melody_array.length-2] = ctp1_array[melody_array.length-1] - 1;

				ctp2_array[cf_ctp2.length-1] = melody_array[melody_array.length-1][1] + cons_last_notes[Math.floor(Math.random() * cons_last_notes.length)];
				ctp2_array[cf_ctp2.length-2] = ctp2_array[cf_ctp2.length-1];
				ctp2_array[cf_ctp2.length-3] = ctp2_array[cf_ctp2.length-1] - 1;
			}

			//PASSING Notes
			e = first_ctp2_index+1;

			while(e<ctp2_array.length-2){
				if ( Math.abs(ctp2_array[e-1]-ctp2_array[e+1]) == 4) {
					ctp2_array[e] = (ctp2_array[e-1]+ctp2_array[e+1])/2;
				}
				e += 2; 
			}

			//CONTROLLA CHE LE NOTE GENERATE APPARTENGANO ALLA GIUSTA TONALITA; SE NON VANNO BENE LE CAMBIA
			
			if (melody_array[0][1] == 48 || melody_array[0][1] == 60){
				rightKey_C(ctp1_array);
				for (var k=indice_idx_array;k<idx_array.length;k++){
					if (idx_array[k] != 0){
						if (melody_array[idx_array[k]][1] == 38 || melody_array[idx_array[k]][1] == 40 || melody_array[idx_array[k]][1] == 45 || melody_array[idx_array[k]][1] == 47 || melody_array[idx_array[k]][1] == 50 || melody_array[idx_array[k]][1] == 52 || melody_array[idx_array[k]][1] == 57 || melody_array[idx_array[k]][1] == 59 || melody_array[idx_array[k]][1] == 62 || melody_array[idx_array[k]][1] == 64 || melody_array[idx_array[k]][1] == 69 || melody_array[idx_array[k]][1] == 71 || melody_array[idx_array[k]][1] == 74 || melody_array[idx_array[k]][1] == 76){
							right_key_note[idx_array[k]] = melody_array[idx_array[k]][1] + 3;
						} 
						else {
							right_key_note[idx_array[k]] = melody_array[idx_array[k]][1] + 4;
						}	
						ctp1_array[idx_array[k]] = right_key_note[idx_array[k]];
					}
				}

			}

			else if (melody_array[0][1] == 62 || melody_array[0][1] == 50){
				rightKey_D(ctp1_array);
				for (var k=indice_idx_array;k<idx_array.length;k++){
					if (idx_array[k] != 0){
						if (melody_array[idx_array[k]][1] == 40 || melody_array[idx_array[k]][1] == 42 || melody_array[idx_array[k]][1] == 47 || melody_array[idx_array[k]][1] == 49 || melody_array[idx_array[k]][1] == 52 || melody_array[idx_array[k]][1] == 54 || melody_array[idx_array[k]][1] == 59 || melody_array[idx_array[k]][1] == 61 || melody_array[idx_array[k]][1] == 64 || melody_array[idx_array[k]][1] == 66 || melody_array[idx_array[k]][1] == 71 || melody_array[idx_array[k]][1] == 73 || melody_array[idx_array[k]][1] == 76 || melody_array[idx_array[k]][1] == 78){
							right_key_note[idx_array[k]] = melody_array[idx_array[k]][1] + 3;
						} 
						else {
							right_key_note[idx_array[k]] = melody_array[idx_array[k]][1] + 4;
						}	
						ctp1_array[idx_array[k]] = right_key_note[idx_array[k]];
					}
				}

			}

			else if (melody_array[0][1] == 52 || melody_array[0][1] == 64){
				rightKey_E(ctp1_array);
				for (var k=indice_idx_array;k<idx_array.length;k++){
					if (idx_array[k] != 0){
						if (melody_array[idx_array[k]][1] == 42 || melody_array[idx_array[k]][1] == 44 || melody_array[idx_array[k]][1] == 49 || melody_array[idx_array[k]][1] == 51 || melody_array[idx_array[k]][1] == 54 || melody_array[idx_array[k]][1] == 56 || melody_array[idx_array[k]][1] == 61 || melody_array[idx_array[k]][1] == 63 || melody_array[idx_array[k]][1] == 66 || melody_array[idx_array[k]][1] == 68 || melody_array[idx_array[k]][1] == 73 || melody_array[idx_array[k]][1] == 75 || melody_array[idx_array[k]][1] == 78 || melody_array[idx_array[k]][1] == 80){
							right_key_note[idx_array[k]] = melody_array[idx_array[k]][1] + 3;
						} 
						else {
							right_key_note[idx_array[k]] = melody_array[idx_array[k]][1] + 4;
						}	
						ctp1_array[idx_array[k]] = right_key_note[idx_array[k]];
					}
				}

			}

			

			//rightKey(ctp2_array);

		}
	

		play_button_clicked = document.querySelector("#play_button");
		ctp1_button_clicked = document.querySelector("#ctp1_button");
		ctp2_button_clicked = document.querySelector("#ctp2_button");

// Playing notes
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
			k = first_cf_index;
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
				play_button_clicked.classList.toggle("clicked_button");
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
		    
		    osc.stop(melody_duration);
		}

	//Playing Melody and First Species Ctp notes
		g = 0;

		document.querySelectorAll("#ctp1_button").forEach(togglePlayFirstCtp);
			
		function togglePlayFirstCtp(item){
			item.onclick = callStartFirstCtp;
		}

		function callStartFirstCtp(){
			g = first_cf_index;
			ctp1_button_clicked.classList.toggle("clicked_button");
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
				ctp1_button_clicked.classList.toggle("clicked_button");
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
		document.querySelectorAll("#ctp2_button").forEach(toggleSecondCtp);
		
		function toggleSecondCtp(item){
			item.onclick = callStartSecondCtp;
		}

		y = 0;

		function callStartSecondCtp(){
				
			k = first_cf_index;
			g = first_cf_index;
			y = first_ctp2_index;
			ctp2_button_clicked.classList.toggle("clicked_button");
			clearScreen();
			startSecondCtp();

		}

		function startSecondCtp(){

			if (y<ctp2_duration.length){
				//Ctp2 notes
				midi_freq_second = ctp2_array[y];
				keyb_freq_second = min_keyb_freq*Math.pow(2,(midi_freq_second - min_midi_freq)**1/12);

				//Min notes
				midi_chord_freq = cf_ctp2[y];
				keyb_chord_freq = min_keyb_freq*Math.pow(2,(midi_chord_freq - min_midi_freq)**1/12);

				//console.log(keyb_chord_freq + " + " + keyb_freq_second);
				drawSecondCtp(midi_chord_freq,midi_freq_second,dx_2ctp[y]);
				playSecondCtp(keyb_freq_second,keyb_chord_freq);
				setTimeout(startSecondCtp, melody_duration*500);
				y++;

			} else {
				ctp2_button_clicked.classList.toggle("clicked_button");
			}
		}

		function playSecondCtp(freq1,freq2){
			ctp2_context = new AudioContext();
			
			cf2_osc = ctp2_context.createOscillator();
			gainFirst = ctp2_context.createGain();

			ctp2_osc = ctp2_context.createOscillator();
			ctp2_gain = ctp2_context.createGain();
			
			cf2_osc.connect(gainFirst);
			gainFirst.connect(ctp2_context.destination);

			ctp2_osc.connect(ctp2_gain);
			ctp2_gain.connect(ctp2_context.destination);
			
			gainFirst.gain.value = valore_gain_4;
			ctp2_gain.gain.value = valore_gain_4;

			constant_Node = ctp2_context.createConstantSource();
			constant_Node.connect(gainFirst.gain);
			constant_Node.connect(ctp2_gain.gain);
			constant_Node.offset.value = valore_gain_4;
			constant_Node.start();

			cf2_osc.frequency.value = freq1;
			ctp2_osc.frequency.value = freq2;
			
			ctp2_osc.start();
			cf2_osc.start();
									
			ctp2_gain.gain.linearRampToValueAtTime(valore_gain_4,ctp2_duration[y]/4); 
		   	ctp2_gain.gain.linearRampToValueAtTime(0,ctp2_duration[y]); 
			
			ctp2_osc.stop(ctp2_duration[y]);
			cf2_osc.stop(ctp2_duration[y]);
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
		canvas_id = document.querySelector("#canvas_id");
		canvas_context = canvas_id.getContext("2d");

		WIDTH = canvas_id.width;
		HEIGHT = canvas_id.height;
		h = HEIGHT/23;
		min_canvas = 47;
		dy = HEIGHT/23;
		dx = 20;

		y_c = [0, dy, dy*3/2,2*dy,dy*5/2,3*dy,4*dy,dy*9/2,dy*5,dy*11/2,dy*6,dy*13/2];
		for (var i = 12;i<50;i++){
			y_c[i] = y_c[i-12]+dy*7;
		}

		function clearScreen(){
			canvas_context.clearRect(0, 0, WIDTH, HEIGHT);
			x_canvas = 0;
		}

		function drawRect(y_canvas,style,dx) {
			    canvas_context.beginPath();
			    canvas_context.fillStyle = style;
			    canvas_context.fillRect(x_canvas, y_canvas, dx, dy);
			    canvas_context.fill();
			    canvas_context.closePath();
		}

		function drawMelody(midiFreq) {
			y_canvas = y_c[midiFreq-min_canvas];
			var style = "#0095DD";
			drawRect(y_canvas, style,dx);
			x_canvas += dx;
		}

		function drawChords(mFreq,ctpFreq) {
			y_canvas = y_c[mFreq-min_canvas];;
			var style = "#0095DD";
			y_1ctp = y_c[ctpFreq-min_canvas];;
			var style_ctp = "#FF8C00";
			drawRect(y_canvas, style,dx);
			drawRect(y_1ctp, style_ctp,dx);
			x_canvas += dx;
		}

		function drawSecondCtp(mFreq,ctpFreq,dx_array) {	
			y_canvas = y_c[mFreq-min_canvas];;
			var style = "#0095DD";
			y_1ctp = y_c[ctpFreq-min_canvas];;
			var style_ctp = "#FF8C00";
			dx = dx_array;
			drawRect(y_canvas, style,dx);
			drawRect(y_1ctp, style_ctp,dx);
			x_canvas += dx_array;
		}