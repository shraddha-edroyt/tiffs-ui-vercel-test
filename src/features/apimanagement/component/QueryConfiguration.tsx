"use client";
import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, Trash2, Copy, RefreshCw } from "lucide-react";
import { Heading, Text } from "@/components/ui/Typography";
import FormField from "@/components/ui/form/FormField";
import ReusableDropdown from "@/components/ui/ReusableDropdown";
import Checkbox from "@/components/ui/Checkbox";

export default function QueryConfiguration() {
  // State for dynamic values
  const [dialect, setDialect] = useState("Oracle");
  const [fromTable, setFromTable] = useState("Products");
  const [filterField, setFilterField] = useState("o.order_id");
  const [filterOperator, setFilterOperator] = useState("=");
  const [orderColumn, setOrderColumn] = useState("column");
  const [orderDirection, setOrderDirection] = useState("ASC");

  // Dynamic Options
  const dialectOptions = ["Oracle", "PostgreSQL", "MySQL", "SQL Server"];
  const tableOptions = ["Products", "Users", "Orders", "Customers"];
  const fieldOptions = [
    "o.order_id",
    "p.product_id",
    "c.customer_id",
    "status",
  ];
  const operatorOptions = ["=", "!=", ">", "<", ">=", "<=", "LIKE", "IN"];
  const orderColumnOptions = [
    "column",
    "id",
    "created_at",
    "updated_at",
    "name",
  ];
  const orderDirectionOptions = ["ASC", "DESC"];

  return (
    <div className="font-tertiary w-full pb-10">
      <Heading level={6} className="text-gray-800 mb-1 leading-snug">
        Query configuration
      </Heading>
      <Text className="text-[#a1a1a1] text-xs mb-4">
        Define your API properties and build SQl query
      </Text>

      <div className="space-y-4">
        {/* Card 1: Dialect */}
        <div className="border border-[#F1F1F1] rounded-lg p-4 bg-white shadow-sm">
          <FormField
            layout="horizontal"
            label="Dialect"
            className="mb-0 items-center"
          >
            {/* Increased width via flex-1 to push button to the right */}
            <div className="relative flex-1">
              <ReusableDropdown
                options={dialectOptions}
                value={dialect}
                onChange={setDialect}
                className="!w-full !border !border-[#F1F1F1] !rounded-[6px] !py-2 !px-3 !text-[11px] !text-[#4A4A4A] !bg-white h-[36px]"
              />
            </div>
            {/* Button aligned with input height using !py-2 and !text-[11px] */}
            <Button
              variant="primary"
              size="sm"
              className="!py-2 !text-[11px] !rounded-[6px] !px-3 h-[36px] flex items-center shrink-0"
              icon={<Plus className="w-[12px] h-[12px]" />}
            >
              Add Table
            </Button>
          </FormField>

          {/* Checkboxes aligned to start (no left margin) */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <Checkbox label="DISTINCT" />
            <Checkbox label="Qualify columns" />
            <Checkbox label="Quote identifiers" />
          </div>
        </div>

        {/* Card 2: From and Select Columns */}
        <div className="border border-[#F1F1F1] rounded-lg p-4 bg-white shadow-sm">
          <FormField
            layout="horizontal"
            label="From"
            className="mb-4 items-center"
          >
            <div className="flex flex-col sm:flex-row flex-1 gap-3">
              {/* Increased width to flex-1 */}
              <div className="relative flex-1 sm:flex-none sm:w-[200px]">
                <ReusableDropdown
                  options={tableOptions}
                  value={fromTable}
                  onChange={setFromTable}
                  className="!w-full !border !border-[#F1F1F1] !rounded-[6px] !py-2 !px-3 !text-[11px] !text-[#4A4A4A] !bg-white h-[36px]"
                />
              </div>
              <Input
                placeholder="Alias"
                className="!bg-white !w-full sm:!w-[120px] !border-[#F1F1F1] !py-2 !text-[11px] !rounded-[6px] !placeholder-[#A1A1A1] h-[36px]"
              />
            </div>
            <Button
              variant="primary"
              size="sm"
              className="!bg-[#EF4444] !bg-none border-none shadow-none hover:bg-red-600 !py-2 !text-[11px] !rounded-[6px] h-[36px] !px-3 shrink-0"
              icon={<Trash2 className="w-[12px] h-[12px]" />}
            >
              Remove
            </Button>
          </FormField>

          {/* Divider Line between From and Select Columns */}
          <div className="border-t border-[#F1F1F1] mb-4"></div>

          <FormField
            layout="vertical"
            label="Select Columns (none = all)"
            className="mt-2"
          >
            {/* Checkboxes aligned to start */}
            <div className="flex flex-wrap items-center gap-3">
              <Checkbox label="id" />
              <Checkbox label="order_id" />
              <Checkbox label="Product_id" />
              <Checkbox label="customer_id" />
            </div>
          </FormField>
        </div>

        {/* Card 3: WHERE, Add Filter, GROUP BY */}
        <div className="border border-[#F1F1F1] rounded-lg p-4 bg-white shadow-sm space-y-4">
          <FormField layout="horizontal" label="WHERE" className="items-center">
            {/* Expanded width to fill card */}
            <Input
              placeholder="Optional WHERE clause"
              className="!bg-white flex-1 !border-[#F1F1F1] !py-2 !text-[11px] !rounded-[6px] !placeholder-[#D1D5DB] h-[36px] w-full"
            />
          </FormField>

          <FormField
            layout="horizontal"
            label="Add Filter"
            className="items-center"
          >
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <div className="relative w-full sm:w-[140px]">
                <ReusableDropdown
                  options={fieldOptions}
                  value={filterField}
                  onChange={setFilterField}
                  className="!w-full !border !border-[#F1F1F1] !rounded-[6px] !py-2 !px-3 !text-[11px] !text-[#4A4A4A] !bg-white h-[36px]"
                />
              </div>
              <div className="relative w-full sm:w-[80px]">
                <ReusableDropdown
                  options={operatorOptions}
                  value={filterOperator}
                  onChange={setFilterOperator}
                  className="!w-full !border !border-[#F1F1F1] !rounded-[6px] !py-2 !px-3 !text-[11px] !text-[#4A4A4A] !bg-white h-[36px]"
                />
              </div>
              {/* Value input expanded with flex-1 to reach button */}
              <Input
                placeholder="value"
                className="!bg-white flex-1 !border-[#F1F1F1] !py-2 !text-[11px] !rounded-[6px] !placeholder-[#D1D5DB] h-[36px]"
              />
            </div>
            <Button
              variant="primary"
              size="sm"
              className="!py-2 !text-[11px] !rounded-[6px] h-[36px] !px-3 shrink-0"
              icon={<Plus className="w-[12px] h-[12px]" />}
            >
              Add
            </Button>
          </FormField>

          <FormField
            layout="horizontal"
            label="GROUP BY"
            className="items-center"
          >
            <Input
              placeholder="c.country"
              className="!bg-white flex-1 !border-[#F1F1F1] !py-2 !text-[11px] !rounded-[6px] !placeholder-[#D1D5DB] h-[36px]"
            />
          </FormField>
        </div>

        {/* Card 4: ORDER BY, LIMIT, OFFSET */}
        <div className="border border-[#F1F1F1] rounded-lg p-4 bg-white shadow-sm space-y-4">
          <FormField
            layout="horizontal"
            label="ORDER BY"
            className="items-center"
          >
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              {/* Column dropdown expanded with flex-1 */}
              <div className="relative flex-1 sm:flex-none sm:w-[200px]">
                <ReusableDropdown
                  options={orderColumnOptions}
                  value={orderColumn}
                  onChange={setOrderColumn}
                  className="!w-full !border !border-[#F1F1F1] !rounded-[6px] !py-2 !px-3 !text-[11px] !text-[#4A4A4A] !bg-white h-[36px]"
                />
              </div>
              {/* ASC/DESC kept small */}
              <div className="relative w-full sm:w-[80px]">
                <ReusableDropdown
                  options={orderDirectionOptions}
                  value={orderDirection}
                  onChange={setOrderDirection}
                  className="!w-full !border !border-[#F1F1F1] !rounded-[6px] !py-2 !px-3 !text-[11px] !text-[#4A4A4A] !bg-white h-[36px]"
                />
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="!py-2 !text-[11px] !rounded-[6px] h-[36px] !px-3 shrink-0"
              icon={<Plus className="w-[12px] h-[12px]" />}
            >
              Add
            </Button>
          </FormField>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
            <FormField
              layout="horizontal"
              label="LIMIT"
              className="items-center"
            >
              <Input
                placeholder="100"
                className="!bg-white w-[80px] !border-[#F1F1F1] !py-2 !text-[11px] !rounded-[6px] !placeholder-[#D1D5DB] !text-center h-[36px]"
              />
            </FormField>

            <FormField
              layout="horizontal"
              label="OFFSET"
              className="items-center"
            >
              <Input
                placeholder="0"
                className="!bg-white w-[80px] !border-[#F1F1F1] !py-2 !text-[11px] !rounded-[6px] !placeholder-[#D1D5DB] !text-center h-[36px]"
              />
            </FormField>
          </div>
        </div>

        {/* Card 5: Generated SQL Query */}
        <div className="border border-[#F1F1F1] rounded-lg p-4 bg-white shadow-sm">
          <FormField layout="vertical" label="Generated SQL Query">
            <textarea
              className="w-full border border-[#F1F1F1] rounded-[6px] p-3 text-[11px] text-[#A1A1A1] font-mono outline-none resize-none h-28 focus:ring-1 focus:ring-purple-200 bg-white"
              defaultValue="SELECT * FROM users WHERE id = ?"
              readOnly
            />
            <div className="flex justify-end gap-3 mt-3">
              <Button
                variant="secondary"
                size="sm"
                className="!bg-white border border-[#F1F1F1] shadow-sm text-[#4A4A4A] font-medium !py-2 !rounded-[6px] !px-4 !text-[11px] h-[36px]"
                icon={<Copy className="w-[12px] h-[12px] text-[#A1A1A1]" />}
              >
                Copy SQL
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="!bg-white border border-[#F1F1F1] shadow-sm !text-[#EF4444] font-medium !py-2 !rounded-[6px] !px-4 hover:bg-red-50 !text-[11px] h-[36px]"
                icon={<RefreshCw className="w-[12px] h-[12px]" />}
              >
                Reset Query
              </Button>
            </div>
          </FormField>
        </div>
      </div>
    </div>
  );
}
