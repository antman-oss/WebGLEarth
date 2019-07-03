define( [], function () {
    'use strict';

    // *****************************************************************************
    // Dimensions & Measures
    // *****************************************************************************
    var dimensions = {
        uses: "dimensions",
        min: 2,
		max: 5
	};

    var measures = {
        uses: "measures",
        min: 0,
		max: 2
    };

    // *****************************************************************************
    // Appearance Section
    // *****************************************************************************
    var appearanceSection = {
        uses: "settings",
		items: {
			one: {
				type: "items",
				label: "Animation Timing",
				items: {
					one_paragraph: {
						label:"0 to disable. Try 0.1 for standard pace.",
						component:"text"
					},
					one_option: {
						ref: "props.q_animation",
						label: "Animation Timing",
						type: "number",
						expression: "optional",
						defaultValue: 0
					}
				}
			},
			two: {
				type: "items",
				label: "Location Marker(s)",
				items: {
					two_paragraph: {
						label: "Comma separated list of icon uri(s). The icons are placed in an array which is referenced using Dimension 4.",
						component: "text"
					},
					two_option: {
						ref: "props.q_icons",
						label: "Uri String",
						type: "string",
						expression: "optional"
					}
				}
			},
			three: {
				ref: "props.q_starting",
				label: "Start Position (Lat,Long)",
				type: "string",
				expression: "optional",
				defaultValue: '0,0'
			},
			four: {
				ref: "props.q_tileurl",
				label: "Tile URL",
				type: "string",
				expression: "optional",
				defaultValue: "http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg"
			},
			five: {
				ref: "props.q_tilezoom",
				label: "Zoom Value",
				type: "number",
				expression: "optional",
				defaultValue: 3.0
			}
         }
    };

    // *****************************************************************************
    // Main property panel definition
    // ~~
    // Only what's defined here will be returned from properties.js
    // *****************************************************************************

	

    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            appearance: appearanceSection,
			about: {
				component:"items",
				label:"About",
				items:{
					header:{
						label:"Usage",
						style:"header",
						component:"text"
					},
					paragraph1:{
                        label:"1st Dimension Latitude (Mandatory)",
                    	component:"text"
					},
					paragraph2:{
                        label:"2nd Dimension Longitude (Mandatory)",
                    	component:"text"
					},
					paragraph3:{
                        label:"3rd Dimension is Item Name",
                    	component:"text"
					},
					paragraph4:{
                        label:"4th Dimension is Item Icon Position starting at 0",
                    	component:"text"
					},
					paragraph5:{
                        label:"5th Dimension is Item Description",
                    	component:"text"
					}
				}
			}
		}
    };

} );
