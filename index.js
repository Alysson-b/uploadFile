document.getElementById('uploadInput').addEventListener('change', function() {
    const thumbnailContainer = document.getElementById('thumbnailContainer')
    thumbnailContainer.innerHTML = ''

    if (uploadInput) {
        uploadInput.addEventListener('change', function() {
            thumbnailContainer.innerHTML = ''; // Limpar o contêiner de miniaturas

            // Iterar sobre os arquivos selecionados
            [...this.files].forEach(file => {
                const fileReader = new FileReader();

                fileReader.onload = function(e) {
                    if (file.type.startsWith('image/')) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        thumbnailContainer.appendChild(img);
                    } else {
                        const fileIcon = document.createElement('div');
                        fileIcon.className = 'file-icon';
                        fileIcon.textContent = '📄';
                        thumbnailContainer.appendChild(fileIcon);
                    }
                };

                if (file.type.startsWith('image/')) {
                    fileReader.readAsDataURL(file);
                } else {
                    // Se não for uma imagem, ainda processar o arquivo para mostrar um ícone
                    fileReader.readAsDataURL(file);
                }
            });
        });
    } else {
        console.error('Elemento de input não encontrado!');
    }
});
  
  async function upload() {
    const fileInput = document.getElementById("uploadInput");
    const fileLabel = document.getElementById('fileLabel');
    const uploadButton = document.getElementById('uploadButton');
    const progressElement = document.getElementById('uploadProgress');
    const loader = document.getElementById('loader');
  
    fileInput.disabled = true;
    fileLabel.style.pointerEvents = 'none';
    fileLabel.setAttribute('disabled,', 'true')
    uploadButton.disabled, = true;
    loader.style.display = 'block'
    progressElement.hidden = false;
    
    const su = new SmashUploader({ region: "us-east-1", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YmJiMjE0LWQ3ZDQtNDkwOC04YzU1LTM3MDY5NjVkYzY1OS1ldSIsInVzZXJuYW1lIjoiMjMxODZmMTQtZDA1Yy00YjhhLWI0MmYtYTQ3NTQ0MTkyZGZmIiwicmVnaW9uIjoidXMtZWFzdC0xIiwiaXAiOiIxODkuMzYuMjA1LjEzOCIsInNjb3BlIjoiTm9uZSIsImFjY291bnQiOiJjZjgxN2M1Ny0xOGVhLTRlMjgtYTA4ZC05NTY2MDk2YzY3ODAtZWEiLCJpYXQiOjE3MjQxNTQ4MzUsImV4cCI6NDg3OTkxNDgzNX0.dY4jZL7034ytkS01Ba8bPv8oAy-c-RswLB05DDCXRcE" })
  
  
    try {
      const transfer = await su.upload({ files: [...fileInput.files] });
      console.log("Transfer", transfer); 
      progressElement.value = 100;
    } 
    catch(error) { 
      console.log("Error", error);
      progressElement.hidden = true;
    }
    finally {
      fileInput.disabled = false;
      fileLabel.style.pointerEvents = 'auto';
      fileLabel.removeAttribute('disabled')
      uploadButton.disabled = false;
      loader.style.display = 'none';
  }
  
        su.on('progress', (event) => {
          const progressData = event.data && event.data.progress;
          if (progressData && progressData.percent !== undefined) {
            progressElement.value = progressData.percent;
            console.log("Progress", progressData.percent);
        } else {
            console.log("deu merda");
        }
    })
  }
  