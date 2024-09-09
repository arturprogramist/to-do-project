

class Service {

    _apiList = "/api/todo/list";
    _apiTask = "/api/todo/list/task";

    postApi = async (type, body) => {
        try {
        const response = await fetch(type === "list" ? this._apiList : this._apiTask, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
    
        const result = await response.json();
        console.log('Успешный запрос:', result); 
        } catch (error) {
        console.error('Ошибка при запросе:', error.message); 
        }
    }

    getApi = async (type) => {
        try {
            const result = await fetch(type === "list" ? this._apiList : this._apiTask);
            if(!result.ok) throw new Error(`we have a problems ${result.status}`)

            const data = await result.json();
            console.log(data);
            return data
        } 
        catch(error) {
            console.log(error);
        }
    }

    deleteElem = async (type, id) => {
        try {
            const response = await fetch(type === "list" ? `${this._apiList}/${id}` : `${this._apiTask}/${id}`, {
                method: 'DELETE'
            });
            if(!response.ok) {
                throw new Error(`sheet happen! Error: ${response.status}`)
            }
            console.log(`Удаление успешно! ID: ${id}`);
        }
        catch(error) {
            console.log(error);
        }
    } 

    updateElem = async(type, body, id) => {
        try {
            const response = await fetch(`${type === "list" ? this._apiList : this._apiTask}/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if(!response.ok) {
                throw new Error(`sheet happen! Error: ${response.status}`)
            }
            console.log(`Удаление успешно! ID: ${id}`);
        }
        catch(error) {
            console.log(error);
        }
    }
}

export default Service;