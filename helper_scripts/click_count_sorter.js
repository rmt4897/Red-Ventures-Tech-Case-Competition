/* function to sort by click count 
   takes in array of 
*/

function sort_by_click_count(array) {
    
    function sort_helper(array_a, array_b) {    // sort help function
        // sorting objects, this function specifies that we're sorting by vote_avg
        return (array_b.ClickCount - array_a.ClickCount); // sorting in descending order
    }
    array.sort(sort_helper); // sort function call
    var top_5 = [];
    for (i = 0; i < 5; i++) {
        top_5[i] = array[i];
    } // this loop relocates the top five most
      // clicked movies/shoes into 'top_5[]'
    return top_5;
} // end function