 <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        {/* Shadow filter for 3D effect */}
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#999" />
          </filter>
        </defs>

        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={50}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
          isAnimationActive={true}
          style={{ filter: "url(#shadow)" }} // Apply the drop shadow
        >
          {pieData.map((entry, i) => (
            <Cell
              key={`cell-${i}`}
              fill={`url(#grad${i})`}
            />
          ))}
        </Pie>

        {/* Define gradient fills for a "shiny" 3D look */}
        <defs>
          {pieData.map((entry, i) => (
            <radialGradient key={i} id={`grad${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.6} />
              <stop offset="100%" stopColor={COLORS[i % COLORS.length]} stopOpacity={1} />
            </radialGradient>
          ))}
        </defs>

        <Tooltip content={<CustomTooltip total={total} />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          align="center"
          wrapperStyle={{ fontSize: "0.9rem" }}
        />
      </PieChart>
    </ResponsiveContainer>