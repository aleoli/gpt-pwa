import { Box, Container, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const textGenerationModels = ["gpt-3.5-turbo", "gpt-4", "gpt-4-1106-preview"];
const imageGenerationModels = ["dall-e-2", "dall-e-3"];

function Settings() {
  const [ apiKey, setApiKey ] = React.useState<string | null>(localStorage.getItem('openAIApiKey'));
  const [ initialization, setInitialization ] = React.useState<string>(localStorage.getItem('initialization') ?? 'You are an helpful assistant.');
  const [ textGenerationModel, setTextGenerationModel ] = React.useState<string>(localStorage.getItem('textGenerationModel') ?? textGenerationModels[0]);
  const [ imageGenerationModel, setImageGenerationModel ] = React.useState<string>(localStorage.getItem('imageGenerationModel') ?? imageGenerationModels[0]);

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{my: 2}}>
          <Box sx={{ p: 1 }}>
            <TextField type="password" fullWidth label="API Key" id="apiKey" value={ apiKey ?? '' } onChange={(event) => {
              const v = (event.target as HTMLInputElement).value;
              if (v === '') {
                setApiKey(null);
                localStorage.removeItem('openAIApiKey');
              } else {
                setApiKey(v);
                localStorage.setItem('openAIApiKey', v);
              }
            }} />
            <FormHelperText>
              Insert your <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer">OpenAI API Key</a>
            </FormHelperText>
          </Box>
          <Box sx={{ p: 1 }}>
            <TextField type="text" fullWidth label="Initialization" id="initialization" value={ initialization } onChange={(event) => {
              const v = (event.target as HTMLInputElement).value;
              setInitialization(v);
              localStorage.setItem('initialization', v);
            }} />
          </Box>
          <Box sx={{ p: 1 }}>
            <InputLabel id="textGenerationModelLabel">Text Generation Model</InputLabel>
            <Select fullWidth labelId="textGenerationModelLabel" id="textGenerationModel" value={ textGenerationModel } onChange={(event) => {
              const v = (event.target as HTMLInputElement).value;
              setTextGenerationModel(v);
              localStorage.setItem('textGenerationModel', v);
            }}>
              { textGenerationModels.map((model) => (
                <MenuItem key={ model } value={ model }>{ model }</MenuItem>
              )) }
            </Select>
          </Box>
          <Box sx={{ p: 1 }}>
            <InputLabel id="imageGenerationModelLabel">Image Generation Model</InputLabel>
            <Select fullWidth labelId="imageGenerationModelLabel" id="imageGenerationModel" value={ imageGenerationModel } onChange={(event) => {
              const v = (event.target as HTMLInputElement).value;
              setImageGenerationModel(v);
              localStorage.setItem('imageGenerationModel', v);
            }}>
              { imageGenerationModels.map((model) => (
                <MenuItem key={ model } value={ model }>{ model }</MenuItem>
              )) }
            </Select>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Settings;
