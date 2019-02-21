export default {
	lists : {
		byId : {
			"0" : {
				id : "0",
				name : "Todo",
			},
			"1" : {
				name : "In Progress",
				id   : "1",
			},
			"2" : {
				id   : "2",
				name : "Done",
			}
		},
		allLists : ["0", "1", "2"],
	},
	cards : {
		byId : {
			"0" : {
				id: "0",
				title: "Features",
				description: "Below is a list of taskes you will complete.",
				tasks : ["0", "1", "2", "3"]
			},
			"1" : {
				id: "1",
				title: "Example",
				description: "",
				tasks : ["4"]
			},
			"2" : {
				id: "2",
				title: "Remove card",
				description: "Sort to the top or create a new list and move from this list to the new list",
				tasks : ["5", "6",]
			},
			"3" : {
				id: "3",
				title: "In Progress",
				description: "Try adding some more cards on this list.",
				tasks : []
			},
			"4" : {
				id: "4",
				title: "I keep your state!",
				description: "By now you might have noticed how I keep state. In case you missed that, try complete the tasks here",
				tasks : ["7"]
			},
		},
	},
	tasks : {
		byId : {
			"0" : {
				id : "0",
				name: "Click to edit or delete",
				done: true
			},
			"1" : {
				id : "1",
				name : "Click check button to toggle as complete",
				done : false
			},
			"2" : {
				id: "2",
				name: "Click on the top right icon to view the card menu.",
				done: false
			},
			"3" : {
				id: "3",
				name: "Drag and Drop this card on 'Done List'",
				done: false
			},
			"4" : {
				id: "4",
				name: "Add a description, more tasks",
				done: false
			},
			"5" : {
				id: "5",
				name: "Drag and Drop to sort the list",
				done: false
			},
			"6" : {
				id: "6",
				name: "Create a new list from the top right of the board",
				done: false
			},
			"7" : {
				id: "7",
				name: "Edit, but before saving, drag and drop this card. It will keep the state",
				done: false
			},
		},
	}
};
