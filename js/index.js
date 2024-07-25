window.onload = function () {
  new Vue({
    el: "#app",
    data: {
      tableData: localStorage.getItem("tableData") ? JSON.parse(localStorage.getItem("tableData")) : [
        {
          id: 1,
          title: "多达38度",
          name: "王小虎",
          date: "2016-05-02",
        },
      ],
      nextId: 2, // 初始化下一个 ID
      formInline: {
        title: "",
        name: "",
        date: "",
      },
      form: {
        title: "",
        name: "",
        date: "",
      },
      dialogVisible: false,
      thisId: 1,
    },
    methods: {
      formatDate: function (date) {
        // 使用 Intl.DateTimeFormat 来格式化日期和时间
        const formatter = new Intl.DateTimeFormat("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour12: false,
        });

        return formatter.format(date).replace(/\//g, "-").replace(",", "");
      },
      onSubmit: function () {
        const date = this.formatDate(this.formInline.date);
        // 创建新数据项
        const newItem = {
          id: this.nextId,
          title: this.formInline.title,
          name: this.formInline.name,
          date: date,
        };
        // 将新数据项添加到 tableData 中
        this.tableData.push(newItem);
        // 递增 nextId
        this.nextId++;
        // 清空表单
        this.formInline.title = "";
        this.formInline.name = "";
        this.formInline.date = "";

        localStorage.setItem("tableData", JSON.stringify(this.tableData))
      },
      onRemove: function (id) {
        for (let i = 0; i < this.tableData.length; i++)
          if (this.tableData[i].id == id) this.tableData.splice(i, 1);
        
        localStorage.setItem("tableData", JSON.stringify(this.tableData))
      },
      onEdit: function (id, title, name, date) {
        this.thisId = id;
        this.dialogVisible = true;
        date = new Date(date)
        this.form = {
          title,
          name,
          date
        }
      },
      onEditSubmit: function () {
        const date = this.formatDate(this.form.date);
        // 创建新数据项
        const newItem = {
          id: this.thisId,
          title: this.form.title,
          name: this.form.name,
          date: date,
        };
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id == newItem.id) {
            this.tableData.splice(i, 1);
            this.tableData.push(newItem);
          }
        }
        // 清空表单
        this.form.title = "";
        this.form.name = "";
        this.form.date = "";
        this.dialogVisible = false;

        localStorage.setItem("tableData", JSON.stringify(this.tableData))
      },
    },
  });
};
