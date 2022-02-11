<template>
  <div>
    <vue-highcharts :options="options" ref="columnCharts"></vue-highcharts>
  </div>
</template>
 
<script>
import VueHighcharts from "vue2-highcharts";

export default {
  props: ["data"],
  components: {
    VueHighcharts,
  },
  data() {
    return {
      options: {
        chart: {
          type: "column",
        },
        title: {
          text: "Monthly Average Rainfall",
        },
        subtitle: {
          text: "Source: WorldClimate.com",
        },
        xAxis: {
          categories: [],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "Rainfall (mm)",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 5,
          },
        },
        series: [],
      },
    };
  },
  methods: {
    // updateSeries() {
    //   console.log("this.columnDatas", this.columnData);
    //   console.log(this.options.series);
    //   this.series[0].data = this.columnData.item.map((y) => y.totalSales);
    //   this.series[1].data = this.columnData.item.map((y) => y.totalExpenses);
    //   this.options = {
    //     xaxis: {
    //       categories: this.columnData.item.map((y) => y.date),
    //     },
    //   };
    // },
  },
  watch: {
    title(newValue) {
      this.chartOptions.title.text = newValue;
    },
    data(newValue, oldValue) {
      console.log("newValue", newValue);
      console.log("oldValue", oldValue);
      console.log("pie watch fired", newValue);
      for (let obj of newValue) {
        let x = this.$children[0].chart.series[0].data.findIndex(
          (s) => s.name == obj.name
        );
        if (x != -1) {
          console.log("pair found", obj, obj.y);
          this.$children[0].chart.series[0].data[x].update(obj.y);
        } else {
          //New key value pair
        }
      }
    },
  },
  mounted() {
    // simulation of some data changing after some time

    // const totalSales = this.data.item.map((y) => y.totalSales);
    // const totalExpenses = this.data.item.map((y) => y.totalExpenses);
    // const avgSalesPrice = this.data.item.map((y) => y.avgSalesPrice);
    // const date = this.data.item.map((y) => y.date);
    this.options = {
      //   ...this.options,
      xAxis: {
        categories: "asdsad",
      },
      //   series: [
      //     {
      //       name: "Total sales",
      //       data: [totalSales],
      //     },
      //     {
      //       name: "Total expenses",
      //       data: [totalExpenses],
      //     },
      //     {
      //       name: "Avg sales price",
      //       data: [avgSalesPrice],
      //     },
      //   ],
    };
    console.log("updated");
  },
};
</script>