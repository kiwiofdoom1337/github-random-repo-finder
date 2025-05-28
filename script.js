let dropBtnName = document.getElementById('dropBtn');
let dropBtnText = document.getElementById('dropBtnText')
let dropdownContent = document.getElementById('dropdownContent');
let selectPrompt = document.getElementById('selectPrompt');
let loadingPrompt = document.getElementById('loadingPrompt');
let errorPrompt = document.getElementById('errorPrompt');
let result = document.getElementById('result');
let resultName = document.getElementById('resultName');
let resultDesc = document.getElementById('resultDesc');
let resultLang = document.getElementById('resultLang');
let resultForks = document.getElementById('resultForks');
let resultIssues = document.getElementById('resultIssues');
let refreshBtn = document.getElementById('refreshBtn');
let errorBtn = document.getElementById('errorBtn');
let langCircle = document.getElementById('langCircle');

fetch('./languages.json')
  .then((response) => response.json())
  .then(
    (json) => {
      const languages = json;      

      for (let i = 1; i < languages.length; i++) {
        const dropdownElement = document.createElement('div')
        dropdownElement.innerHTML = languages[i].title;
        dropdownElement.classList.add('list-item');
        dropdownContent.classList.add('hidden');
        dropdownContent.appendChild(dropdownElement);

        dropdownElement.addEventListener('click', () => {
          dropBtnText.innerHTML = dropdownElement.innerHTML;
          result.classList.add('hidden');
          dropdownContent.classList.toggle('hidden');
          errorPrompt.classList.add('hidden');
          selectPrompt.classList.add('hidden');
          loadingPrompt.classList.remove('hidden');

          fetch(`https://api.github.com/search/repositories?q=language:${dropBtnText.innerHTML}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Could not fetch resourse');
            }
            return response.json()
          })
          .then((json) => {
            errorBtn.classList.add('hidden');
            const repo = json.items[Math.floor(Math.random() * json.items.length)];
            console.log(repo);

            fetch('./colors.json')
              .then((response) => response.json())
              .then((json) => {
                let langName = repo.language;
                let langList = json[langName];
                langCircle.style.backgroundColor = langList.color;
              })

            loadingPrompt.classList.add('hidden');
            resultName.innerHTML = repo.full_name;
            resultDesc.innerHTML = repo.description;
            resultLang.innerHTML = repo.language;
            resultStars.innerHTML = repo.stargazers_count;
            resultForks.innerHTML = repo.forks_count;
            resultIssues.innerHTML = repo.open_issues_count;
            result.classList.remove('hidden');
            refreshBtn.classList.remove('hidden');
            
            
          })
          .catch((error) => {
            console.error(error);
            loadingPrompt.classList.add('hidden');
            errorPrompt.classList.remove('hidden');
            refreshBtn.classList.add('hidden');
            errorBtn.classList.remove('hidden');
          })
        })
      }

      dropBtnName.addEventListener('click', () => {
        if (!result.classList.contains('hidden')){
          dropdownContent.classList.toggle('hidden');
          return;
        }
        if (!errorPrompt.classList.contains('hidden')) {
          dropdownContent.classList.toggle('hidden');
          return;
        }
        dropdownContent.classList.toggle('hidden');
        selectPrompt.classList.toggle('hidden');
      }
      )

      refreshBtn.addEventListener('click', () => {
        refreshBtn.style.opacity = '0.8';
        refreshBtn.style.pointerEvents = 'none';
        result.classList.add('hidden');
        errorPrompt.classList.add('hidden');
        loadingPrompt.classList.remove('hidden');
        fetch(`https://api.github.com/search/repositories?q=language:${dropBtnText.innerHTML}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Could not fetch resourse');
            }
            return response.json()
          })
          .then((json) => {
            refreshBtn.style.opacity = '1';
            refreshBtn.style.pointerEvents = 'auto';
            const repo = json.items[Math.floor(Math.random() * json.items.length)];
            console.log(repo);

            fetch('./colors.json')
              .then((response) => response.json())
              .then((json) => {
                let langName = repo.language;
                let langList = json[langName];
                langCircle.style.backgroundColor = langList.color;
              })

            loadingPrompt.classList.add('hidden');
            resultName.innerHTML = repo.full_name;
            resultDesc.innerHTML = repo.description;
            resultLang.innerHTML = repo.language;
            resultStars.innerHTML = repo.stargazers_count;
            resultForks.innerHTML = repo.forks_count;
            resultIssues.innerHTML = repo.open_issues_count;
            result.classList.remove('hidden');
            refreshBtn.classList.remove('hidden');
          })
          .catch((error) => {
            console.error(error);
            loadingPrompt.classList.add('hidden');
            errorPrompt.classList.remove('hidden');
            refreshBtn.classList.add('hidden');
            errorBtn.classList.remove('hidden');
          })
      })


      errorBtn.addEventListener('click', () => {
        errorPrompt.classList.add('hidden');
        errorBtn.style.opacity = '0.8';
        errorBtn.style.pointerEvents = 'none';
        result.classList.add('hidden');
        loadingPrompt.classList.remove('hidden');
        fetch(`https://api.github.com/search/repositories?q=language:${dropBtnText.innerHTML}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Could not fetch resourse');
            }
            return response.json()
          })
          .then((json) => {
            errorBtn.classList.add('hidden');
            errorBtn.style.opacity = '1';
            errorBtn.style.pointerEvents = 'auto';
            const repo = json.items[Math.floor(Math.random() * json.items.length)];
            console.log(repo);

            fetch('./colors.json')
              .then((response) => response.json())
              .then((json) => {
                let langName = repo.language;
                let langList = json[langName];
                langCircle.style.backgroundColor = langList.color;
              })

            loadingPrompt.classList.add('hidden');
            resultName.innerHTML = repo.full_name;
            resultDesc.innerHTML = repo.description;
            resultLang.innerHTML = repo.language;
            resultStars.innerHTML = repo.stargazers_count;
            resultForks.innerHTML = repo.forks_count;
            resultIssues.innerHTML = repo.open_issues_count;
            result.classList.remove('hidden');
            refreshBtn.classList.remove('hidden');
          })
          .catch((error) => {
            console.error(error);
            errorBtn.style.opacity = '1';
            errorBtn.style.pointerEvents = 'auto';
            loadingPrompt.classList.add('hidden');
            errorPrompt.classList.remove('hidden');
            refreshBtn.classList.add('hidden');
            errorBtn.classList.remove('hidden');
          })
      })
    }
  );
