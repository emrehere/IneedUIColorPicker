// colorsRoute.mjs
import express from 'express';
import MyColorsInfo from '../models/colorSchema.mjs';


async function postColors (req, res) {
    
    try {
      const { colors } = req.body;
      
      const { _id } = req.user;

      const user_id = _id;

      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required ' });
      }
  
      if (!colors) {
        return res.status(400).json({ error: 'Colors are required in the request body' });
      }
  
      // Save color data to the database
      const newColorData = new MyColorsInfo({ colors, user_id });
      const savedColor = await newColorData.save();
      console.log('Saved color data:', savedColor);
  
      // Respond to the client with the newly created color and its _id
      res.status(201).json({ _id: savedColor._id, colors: savedColor.colors });
    } catch (error) {
      console.error('Error saving color data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  async function getColors (req, res) {
    console.log("getcolor")
    try {

      const { _id } = req.user;

      const user_id = _id;

      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required ' });
      }

      const filter = { user_id };

      // Query the database to get color data
      const colorData = await MyColorsInfo.find( filter );
      console.log('Retrieved color data:', colorData);
  
      if (!colorData) {
        return res.status(404).json({ error: 'Color data not found' });
      }
  
      
      const colorsWithIds = colorData.map(({ _id, colors }) => ({ _id, colors }));

      console.log(colorsWithIds)
  
      res.status(200).json(colorsWithIds);
    } catch (error) {
      console.error('Error retrieving color data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  async function deleteColorById (req, res) {
    try {

      const { _id } = req.user;

      const user_id = _id;

      if (!user_id) {
        return res.status(400).json({ error: 'User ID is required ' });
      }
  
      const { id } = req.params;
  
      // Delete one color data from the database
      await MyColorsInfo.findByIdAndDelete(id);
  
  
  
      res.status(200).json({ message: 'Color data deleted successfully' });
  } catch (error) {
      console.error('Error deleting color data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
  };


  

 async function viaHexDelete (req, res) {
  try {
    
    const { _id } = req.user;

    const user_id = _id;

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required ' });
    }

    const hex = req.params.hex;


    const filter = { colors: hex };

    // Find and delete the document that matches the hex color filter
    const deletedDocument = await MyColorsInfo.findOneAndDelete(filter);

    // Check if the document was found and deleted
    if (!deletedDocument) {
      return res.status(404).json({ error: 'No matching document found' });
    }

    res.status(200).json({ message: 'Color deleted successfully', deletedDocument });
  } catch (error) {
    console.error('Error deleting color:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { postColors, getColors, deleteColorById, viaHexDelete };

// async function updateColors (req, res)  {
//   try {
//     const colors = req.body;
//     console.log(colors);

//     // Update all colors in the database with the new array
//     await MyColorsInfo.updateMany({}, { colors: colors });

//     res.status(200).json({ message: 'Colors updated successfully' });
//   } catch (error) {
//     console.error('Error updating colors:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// async function anotherUpdateColors (req, res)  {
//   try {
//     const { colors: newColors } = req.body;

//     // Update all colors in the database with the new array
//     const updateResult = await MyColorsInfo.updateMany({}, { colors: newColors });

//     console.log('Update Result:', updateResult);

//     if (updateResult.nModified > 0) {
//       res.status(200).json({ message: 'Colors updated successfully' });
//     } else {
//       res.status(404).json({ error: 'No colors were updated' });
//     }
//   } catch (error) {
//     console.error('Error updating colors:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



// async function updateColorById (req, res) {
//   try {
//     const { id } = req.params;
//     const  colors  = req.body;

//     // Update one color data in the database
//     const updatedColorData = await MyColorsInfo.findByIdAndUpdate(
//       id,
//       { $set: { colors: colors } },
//       { new: true }
//     );

//     if (!updatedColorData) {
//       return res.status(404).json({ error: 'Color data not found' });
//     }

//     res.status(200).json({ message: 'Color data updated successfully' });
//   } catch (error) {
//     console.error('Error updating color data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// async function updateAllColors (req, res) {
//   try {
//     const { colors } = req.body;

//     if (!colors) {
//       return res.status(400).json({ error: 'Colors are required in the request body' });
//     }

//     // Update all color data in the database
//     await MyColorsInfo.updateMany({}, { $set: { colors: colors } });

//     res.status(200).json({ message: 'Color data updated successfully' });
//   } catch (error) {
//     console.error('Error updating color data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }

// }

// async function deleteColorByValue (req, res) {
//   console.log("hadi aq")
//   try {
//     const { colorValue } = req.params;
//     console.log(colorValue)

//     if (!colorValue) {
//       return res.status(400).json({ error: 'Color value is required in the request parameters' });
//     }

//     // Find and delete the color with the specified value
//     const deletedColor = await Color.findOneAndDelete({ colors: colorValue });

//     if (!deletedColor) {
//       return res.status(404).json({ error: 'Color not found' });
//     }

//     res.status(200).json({ message: 'Color deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting color:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// export { getColors, postColors, deleteColorById, updateColorById, updateAllColors,
//      deleteColorByValue };






