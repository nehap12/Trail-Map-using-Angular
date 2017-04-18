#steps to Run

- Load PCT button will load PCT values 
	- first time from JSON file 
	- Subsequent times it will load PCT values from local storage
	- It will also load the Markers on to the Map
- Edit and Delete buttons inside PCT Mile Marker Table
	- OnClick of Edit, it make the corresponding row editable and the lat and lng values could be update on clicking Save.
	- This will also update the position of the corresponding marker on the Map.
	- Cancel button will cancel the edit operation.
	- Delete button will removce the corresponding row from the table and will remove the corresponding marker from the Map.
- Find nearest Mile Marker button will take the lat and lng values from the user and will find the closest Marker on the Map(The nearest Mile Marker is dsplayed by zooming into it).
- Add new Mile Marker button will create new Mile marker at the end of the existing list of mile markers and will also update Map.
- Used Clustering to display Mile Markers for efiiciency reasons. To view a partcular Mile Marker, please zoom into the particular cluster of interest.


- All of the edits/ Adds to the Mile Markers are synched with the local storage. 


